const hbase = require('hbase')
module.exports.client = hbase({ host: '192.168.1.91', port: 8080 })
