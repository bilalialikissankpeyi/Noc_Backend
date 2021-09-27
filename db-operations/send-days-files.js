//const hbase = require('hbase')

//client = hbase({ host: '192.168.1.91', port: 8080 })

const sendToDb = require('./sendToDb')

var sendVlanPortAssociation = (data) => {
  sendToDb.sendToMongoDb('mydb', 'VlanPortAssociation', data)
  /*client
    .table('VlanPortAssociation')
    .create('VlanAssociationfamily', function (err, success) {
      data.map((element) => {
        client
          .table('VlanPortAssociation')
          .row(` ${element.ObjectID}`)
          .put(
            [
              'VlanAssociationfamily:DnDiscByteCounter',
              'VlanAssociationfamily:DnFwdByteCounter',
              'VlanAssociationfamily:UpDiscByteCounter',
              'VlanAssociationfamily:UpFwdByteCounter',
            ],
            [
              ` ${element.extendPortVlanCurrent1DayDnDiscByteCounter}`,
              ` ${element.extendPortVlanCurrent1DayDnFwdByteCounter}`,
              ` ${element.extendPortVlanCurrent1DayUpDiscByteCounter}`,
              ` ${element.extendPortVlanCurrent1DayUpFwdByteCounter}`,
            ],
            function (err, success) {}
          )
      })
    })*/
}
var send = (data, index) => {
  switch (index) {
    case 0:
      sendVlanPortAssociation(data)
      break
    default:
      console.log('not mentionned')
  }
}

module.exports = { send }
