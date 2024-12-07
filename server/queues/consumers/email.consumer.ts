import type { AmqpChannel } from "deps";
import rabbitMQ from "queues";
import { QUEUE_NAME } from "config/queues.ts";

export const startVerifyEmailConsumer = async () => {
  const channel: AmqpChannel = await rabbitMQ.instance.openChannel();

  const queue = QUEUE_NAME.VERIFY_EMAIL;

  await channel.declareQueue({ queue, durable: true });

  console.log(`[Email Consumer] Waiting for messages in ${queue}...`);

  await channel.consume({ queue }, async (args, props, data) => {
    console.log(JSON.stringify(args));
    console.log(JSON.stringify(props));
    // todo: handle send message and store history
    console.log(new TextDecoder().decode(data));
    await channel.ack({ deliveryTag: args.deliveryTag });
  });
};
