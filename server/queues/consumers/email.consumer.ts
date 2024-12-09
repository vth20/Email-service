import type { AmqpChannel } from "deps";
import rabbitMQ from "queues";
import { QUEUE_NAME } from "config/queues.ts";
import emailService from "services/email.service.ts";

export const startVerifyEmailConsumer = async () => {
  const channel: AmqpChannel = await rabbitMQ.instance.openChannel();

  const queue = QUEUE_NAME.VERIFY_EMAIL;

  await channel.declareQueue({ queue, durable: true });

  console.log(`[Email Consumer] Waiting for messages in ${queue}...`);

  await channel.consume({ queue }, async (args, props, data) => {
    try {
      if (!data) {
        console.warn("Empty data received");
        await channel.ack({ deliveryTag: args.deliveryTag });
        return;
      }
      const payload = JSON.parse(new TextDecoder().decode(data));

      await emailService.sendVerifyEmail(payload);
      await channel.ack({ deliveryTag: args.deliveryTag });
    } catch (error) {
      console.error("Error processing message:", error);
      await channel.nack({ deliveryTag: args.deliveryTag });
    }
  });
};
