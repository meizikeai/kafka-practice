import { Kafka } from "kafkajs";
// import logger from '../libs/logger'

export default () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["10.160.16.45:9092", "10.160.16.45:9092"],
  });

  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: "test-group" });

  const run = async () => {
    // Producing
    await producer.connect();
    await producer.send({
      topic: "test-topic",
      messages: [{ value: "Hello KafkaJS user!" }],
    });

    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: "udists-sg-crc", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  };

  run().catch(console.error);

  const errorTypes = ["unhandledRejection", "uncaughtException"];
  const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

  errorTypes.map((type) => {
    process.on(type, async (e) => {
      try {
        console.log(`process.on ${type}`);
        console.error(e);
        await consumer.disconnect();
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signalTraps.map((type) => {
    process.once(type, async () => {
      try {
        await consumer.disconnect();
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
};
