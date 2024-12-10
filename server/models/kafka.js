import log from '../libs/log.js'
import getMysqlClient from '../libs/mysql.js'
// import getRedisClient from '../libs/redis.js'
// import getserverClient from '../libs/server.js'

function HandleInsetMySQL(data, table) {
  const activityMySQL = getMysqlClient('default.master')
  const insetSQL = `INSERT INTO ${table} (id, uid, status, datetime) VALUES ${data}`

  activityMySQL.query(insetSQL).catch((err) => {
    log.error(err, { notice: 'handleInsetMySQL', insetSQL })
  })
}

export { HandleInsetMySQL }
