import type { AmqpConnection } from "deps";
import { connect } from "deps";
import configs from "../config/config.ts";

class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection: AmqpConnection | null = null;

  // Private constructor to prevent instantiation
  private constructor() {}

  // Get the Singleton instance
  public static getInstance(): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection();
    }
    return RabbitMQConnection.instance;
  }

  // Create or return an existing connection
  public async getConnection() {
    if (!this.connection) {
      try {
        this.connection = await connect(configs.rabbitMQUrl);
        console.log("RabbitMQ connection established!");
      } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        throw error;
      }
    }
    return this.connection;
  }

	public async openChannel() {
      const connection = await this.getConnection(); // Ensure the connection is established
      try {
        console.log("RabbitMQ channel created!");
        return await connection.openChannel();
      } catch (error) {
        console.error("Failed to create RabbitMQ channel:", error);
        throw error;
      }
  }

  // Close the connection
  public async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      console.log("RabbitMQ connection closed!");
    }
  }
}

const RABBITMQ_INSTANCE = RabbitMQConnection.getInstance();

export default {
  instance: RABBITMQ_INSTANCE,
  connection: RABBITMQ_INSTANCE.getConnection(),
};
