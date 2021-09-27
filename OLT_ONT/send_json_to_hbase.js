const hbase = require('hbase')
var OLT_file = require('./admin-2021_6_30-10_49_51_295')
var OLT_file1 = require('./admin')
var ONT_file = require('./LST_ONT-admin-2021_6_30-10_40_51_587')
// Instantiate a new client
client = hbase({ host: '192.168.1.91', port: 8080 })
// Create a table
/*client.table('OLT').create('OLTfamily', function (err, success) {
  // Insert a record
  OLT_file.OLT.map((element) => {
    console.log(` ${element.ObjectName}`)
    client
      .table('OLT')
      .row(` ${element.ObjectName}`)
      .put(
        ['OLTfamily:IPAddress', 'OLTfamily:NEFamily'],
        [` ${element.IPAdress}`, ` ${element.NEFamily}`],
        function (err, success) {
          client
            .table('OLT')
            .row(` ${element.ObjectName}`)
            .get('OLTfamily:IPAddress', function (err, [cell]) {
              // Validate the result
              console.log({ cell: cell })
            })
        }
      )
  })
})
*/
client.table('ONT').create('ONTfamily', function (err, success) {
  // Insert a record
  ONT_file.ONT.map((element, index) => {
    client
      .table('ONT')
      .row(` ${element.ObjectName}`)
      .put(
        [
          'ONTfamily:CustomerID',
          'ONTfamily:DescriptionPart1',
          'ONTfamily:DescriptionPart2',
          'ONTfamily:FamilyType',
          'ONTfamily:PlannedUp',
          'ONTfamily:PlannedSoftware',
          'ONTfamily:SerialNumber',
          'ONTfamily:SubscriberLocationID',
        ],
        [
          ` ${element.CustomerID}`,
          ` ${element.DescriptionPart1}`,
          ` ${element.DescriptionPart2}`,
          ` ${element.FamilyType}`,
          ` ${element.PlannedUp}`,
          ` ${element.PlannedSoftware}`,
          ` ${element.SerialNumber}`,
          ` ${element.SubscriberLocationID}`,
        ],
        function (err, success) {
          if (success === true) {
            console.log(element)
            console.log(index)
            console.log(success)
          }
        }
      )
  })
})
/*
client
  .table('ONT')
  .row(` ${element.ObjectName}`)
  .get('ONTfamily:CustomerID', function (err, [cell]) {
    console.log({ cell: cell })
  })*/
