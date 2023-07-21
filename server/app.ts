import producer from './controllers/kafka.producer'
import consumer from './controllers/kafka.consumer'
import { awaitZookeeper, handleZookeeper } from './libs/zookeeper'

handleZookeeper()
awaitZookeeper().then(() => {
  producer()
  consumer()
})
