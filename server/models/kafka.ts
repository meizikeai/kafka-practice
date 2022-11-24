import logger from '../libs/logger'
import { mysqlClient } from '../libs/connect'

function handleInsetMySQL(data: string, table: string) {
  const activityMySQL = mysqlClient('activity.master')
  const insetSQL = `INSERT INTO ${table} (id, uid, status, datetime) VALUES ${data}`

  activityMySQL.query(insetSQL).catch((err: any) => {
    logger.error(err, { notice: 'handleInsetMySQL', insetSQL })
  })
}

export { handleInsetMySQL }
