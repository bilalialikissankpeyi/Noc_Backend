const hbase = require('hbase')
var OLT_file = require('./admin-2021_6_30-10_49_51_295')
var OLT_file1 = require('./admin')
var ONT_file = require('./LST_ONT-admin-2021_6_30-10_40_51_587')

const sendToDb = require('../db-operations/sendToDb')

sendToDb.sendToMongoDb('mydb', 'OLT_INFO', OLT_file.OLT)
sendToDb.sendToMongoDb('mydb', 'ONT_INFO', ONT_file.ONT)
/*

// Instantiate a new client
client = hbase({ host: '192.168.1.91', port: 8080 })
// Create a table
client.table('OLT1').create('OLTfamily', function (err, success) {
  // Insert a record
  OLT_file1.OLT.map((element) => {
    client
      .table('OLT1')
      .row(` ${element.ObjectName}`)
      .put(
        ['OLTfamily:IPAddress', 'OLTfamily:NEFamily'],
        [` ${element.IPAddress}`, ` ${element.NEFamily}`],
        function (err, success) {
          client
            .table('OLT1')
            .row(` ${element.ObjectName}`)
            .get('OLTfamily:NEFamily', function (err, [cell]) {
              // Validate the result
              console.log({ cell: [cell] })
            })
        }
      )
  })
})
*/
