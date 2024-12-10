import { Kafka, Partitioners, CompressionTypes } from 'kafkajs'

export default () => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9092'],
  })

  const topic = 'topic-test'
  const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  const getRandomNumber = () => Math.round(Math.random() * 1000)
  const createMessage = (num) => ({
    key: `key-${num}`,
    value: `value-${num}-${new Date().toISOString()}`,
  })

  const sendMessage = () => {
    return producer
      .send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: Array(getRandomNumber())
          .fill('')
          .map(() => createMessage(getRandomNumber())),
      })
      .then(console.log)
      .catch((e) => console.error(`[example/producer] ${e.message}`, e))
  }

  const run = async () => {
    await producer.connect()
    setInterval(sendMessage, 3000)
  }

  run().catch((e) => console.error(`[example/producer] ${e.message}`, e))

  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

  errorTypes.forEach((type) => {
    process.on(type, async () => {
      try {
        console.log(`process.on ${type}`)
        await producer.disconnect()
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
        await producer.disconnect()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })
}
