import main from './controllers/kafka'
import { awaitZookeeper, handleZookeeper } from './libs/zookeeper'

handleZookeeper()
awaitZookeeper().then(() => {
  main()
})
