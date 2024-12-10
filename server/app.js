import producer from './controllers/kafka.producer.js'
import consumer from './controllers/kafka.consumer.js'
import { awaitZookeeper, handleZookeeper } from './libs/zookeeper.js'

handleZookeeper()
awaitZookeeper().then(() => {
  producer()
  consumer()
})
