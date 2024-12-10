import { Kafka } from 'kafkajs'

export default () => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9092'],
  })
  const topic = 'topic-test'
  const consumer = kafka.consumer({ groupId: 'test-group' })

  const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      // eachBatch: async ({ batch }) => {
      //   console.log(batch)
      // },
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
      },
    })
  }

  run().catch((e) => console.error(`[example/consumer] ${e.message}`, e))

  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

  errorTypes.forEach((type) => {
    process.on(type, async (e) => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        await consumer.disconnect()
        process.exit(0)
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    })
  })

  signalTraps.forEach((type) => {
    process.once(type, async () => {
      try {
        await consumer.disconnect()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })
}
