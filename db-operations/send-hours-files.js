//const hbase = require('hbase')

///client = hbase({ host: '192.168.1.91', port: 8080 })

const sendToDb = require('./sendToDb')
var sendEthernetPort = (data) => {
  sendToDb.sendToMongoDb('mydb', 'EthernetPort', data)

  /* client
    .table('EthernetPort')
    .create('Ethernetfamily', function (err, success) {
      data.map((element) => {
        client
          .table('EthernetPort')
          .row(` ${element.ObjectID}`)
          .put(
            [
              'Ethernetfamily:ifHCInOctets',
              'Ethernetfamily:ifHCOutOctets',
              'Ethernetfamily:ifInDiscards',
              'Ethernetfamily:ifOutDiscards',
              'Ethernetfamily:tmnxPortAdminStatus',
              'Ethernetfamily:tmnxPortEtherOperSpeed',
              'Ethernetfamily:tmnxPortEtherSpeed',
              'Ethernetfamily:tmnxPortLinkStatus',
              'Ethernetfamily:tmnxPortOperStatus',
            ],
            [
              ` ${element.ifHCInOctets}`,
              ` ${element.ifHCOutOctets}`,
              ` ${element.ifInDiscards}`,
              ` ${element.ifOutDiscards}`,
              ` ${element.tmnxPortAdminStatus}`,
              ` ${element.tmnxPortEtherOperSpeed}`,
              ` ${element.tmnxPortEtherSpeed}`,
              ` ${element.tmnxPortLinkStatus}`,
              ` ${element.tmnxPortOperStatus}`,
            ],
            ` ${element.timestamp}`,
            function (err, success) {}
          )
      })
    })*/
}

var sendCpuUsage = (data) => {
  sendToDb.sendToMongoDb('mydb', 'CpuUsage', data)
  /*client.table('CpuUsage').create('Cpufamily', function (err, success) {
    data.map((element) => {
      client
        .table('CpuUsage')
        .row(` ${element.ObjectID}`)
        .put(
          [
            'Cpufamily:memAbsoluteUsage',
            'Cpufamily:operateStatus',
            'Cpufamily:startMonitorTime',
            'Cpufamily:totalMemSize',
          ],
          [
            ` ${element.memAbsoluteUsage}`,
            ` ${element.operateStatus}`,
            ` ${element.startMonitorTime}`,
            ` ${element.totalMemSize}`,
          ],
          ` ${element.timestamp}`,
          function (err, success) {}
        )
    })
  })*/
}

var sendEthernetLinesLot = (data) => {
  sendToDb.sendToMongoDb('mydb', 'EthernetLinesLot', data)
  /* client
    .table('EthernetLinesLot')
    .create('LinesLotfamily', function (err, success) {
      data.map((element) => {
        client
          .table('EthernetLinesLot')
          .row(` ${element.ObjectID}`)
          .put(
            [
              'LinesLotfamily:extendEtherPortStatisticsIfInDiscards',
              'LinesLotfamily:extendEtherPortStatisticsIfInNUcastPkts',
              'LinesLotfamily:extendEtherPortStatisticsIfInOctets',
              'LinesLotfamily:extendEtherPortStatisticsIfOutDiscards',
              'LinesLotfamily:extendEtherPortStatisticsIfOutNUcastPkts',
              'LinesLotfamily:extendEtherPortStatisticsIfOutOctets',
              'LinesLotfamily:ifAdminStatus',
              'LinesLotfamily:ifHighSpeed',
              'LinesLotfamily:ifOperStatus',
            ],
            [
              ` ${element.extendEtherPortStatisticsIfInDiscards}`,
              ` ${element.extendEtherPortStatisticsIfInNUcastPkts}`,
              ` ${element.extendEtherPortStatisticsIfInOctets}`,
              ` ${element.extendEtherPortStatisticsIfOutDiscards}`,
              ` ${element.extendEtherPortStatisticsIfOutNUcastPkts}`,
              ` ${element.extendEtherPortStatisticsIfOutOctets}`,
              ` ${element.ifAdminStatus}`,
              ` ${element.ifHighSpeed}`,
              ` ${element.ifOperStatus}`,
            ],
            ` ${element.timestamp}`,
            function (err, success) {}
          )
      })
    })*/
}

var sendISAM_ONT = (data) => {
  sendToDb.sendToMongoDb('mydb', 'ISAM_ONT', data)
  /*client.table('ISAM_ONT').create('ONT_family', function (err, success) {
    data.map((element) => {
      client
        .table('ISAM_ONT')
        .row(` ${element.ObjectID}`)
        .put(
          [
            'ONT_family:bponOntEquipId',
            'ONT_family:bponOntSerialNumber',
            'ONT_family:bponOntSubscriberId1',
            'ONT_family:bponOntSubscriberLocId',
            'ONT_family:ifAdminStatus',
            'ONT_family:ifOperStatus',
          ],
          [
            ` ${element.bponOntEquipId}`,
            ` ${element.bponOntSerialNumber}`,
            ` ${element.bponOntSubscriberId1}`,
            ` ${element.bponOntSubscriberLocId}`,
            ` ${element.ifAdminStatus}`,
            ` ${element.ifOperStatus}`,
          ],
          ` ${element.timestamp}`,
          function (err, success) {}
        )
    })
  })*/
}

var sendOntEthPort = (data) => {
  sendToDb.sendToMongoDb('mydb', 'OntEthPort', data)
  /*client.table('OntEthPort').create('OntEthfamily', function (err, success) {
    data.map((element) => {
      client
        .table('OntEthPort')
        .row(` ${element.ObjectID}`)
        .put(
          [
            'OntEthfamily:asamIfExtCustomerId',
            'OntEthfamily:ifAdminStatus',
            'OntEthfamily:ifOperStatus',
          ],
          [
            ` ${element.asamIfExtCustomerId}`,
            ` ${element.ifAdminStatus}`,
            ` ${element.ifOperStatus}`,
          ],
          ` ${element.timestamp}`,
          function (err, success) {}
        )
    })
  })*/
}

var sendOntVeipPort = (data) => {
  sendToDb.sendToMongoDb('mydb', 'OntVeipPort', data)
  /*client.table('OntVeipPort').create('OntVeipfamily', function (err, success) {
    data.map((element) => {
      client
        .table('OntVeipPort')
        .row(` ${element.ObjectID}`)
        .put(
          ['OntVeipfamily:ifAdminStatus', 'OntVeipfamily:ifOperStatus'],
          [` ${element.ifAdminStatus}`, ` ${element.ifOperStatus}`],
          ` ${element.timestamp}`,
          function (err, success) {}
        )
    })
  })*/
}

var sendPon = (data) => {
  sendToDb.sendToMongoDb('mydb', 'Pon', data)
  /*client.table('Pon').create('Ponfamily', function (err, success) {
    data.map((element) => {
      client
        .table('Pon')
        .row(` ${element.ObjectID}`)
        .put(
          ['Ponfamily:ifAdminStatus', 'Ponfamily:ifOperStatus'],
          [` ${element.ifAdminStatus}`, ` ${element.ifOperStatus}`],
          ` ${element.timestamp}`,
          function (err, success) {}
        )
    })
  })*/
}

var sendUni = (data) => {
  sendToDb.sendToMongoDb('mydb', 'VlanPortAssociation', data)
  /*client.table('Uni').create('Unifamily', function (err, success) {
    data.map((element) => {
      client
        .table('Uni')
        .row(` ${element.ObjectID}`)
        .put(
          [
            'Unifamily:DnDiscByteCounter',
            'Unifamily:DnFwdByteCounter',
            'Unifamily:UpDiscByteCounter',
            'Unifamily:UpFwdByteCounter',
            'Unifamily:ifOperStatus',
          ],
          [
            ` ${element.extendPortTotalDnDiscByteCounter}`,
            ` ${element.extendPortTotalDnFwdByteCounter}`,
            ` ${element.extendPortTotalUpDiscByteCounter}`,
            ` ${element.extendPortTotalUpFwdByteCounter}`,
            ` ${element.ifOperStatus}`,
          ],
          ` ${element.timestamp}`,
          function (err, success) {}
        )
    })
  })*/
}

var sendVlanPortAssociation = (data) => {
  sendToDb.sendToMongoDb('mydb', 'VlanPortAssociation', data)
  /* client
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
            ` ${element.timestamp}`,
            function (err, success) {}
          )
      })
    })*/
}

var send = (data, index) => {
  switch (index) {
    case 0:
      sendEthernetPort(data)
      break

    case 1:
      sendCpuUsage(data)
      break
    case 2:
      sendEthernetLinesLot(data)
      break
    case 3:
      sendISAM_ONT(data)
      break

    case 4:
      sendOntEthPort(data)
      break
    case 5:
      sendOntVeipPort(data)
      break
    case 6:
      sendPon(data)
      break

    case 7:
      sendUni(data)
      break
    case 8:
      sendVlanPortAssociation(data)
      break
    default:
      console.log('not mentionned')
  }
}

module.exports = { send }
