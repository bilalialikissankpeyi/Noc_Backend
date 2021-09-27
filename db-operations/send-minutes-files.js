//const hbase = require('hbase')

//var server = require('../db-operations/hbase-connect')

const sendToDb = require('./sendToDb')

var sendBridgePort = async (data) => {
  sendToDb.sendToMongoDb('mydb', 'BridgePort', data)

  /*
  await server.client
    .table('BridgePort')
    .create('Bridgefamily', async function (err, success) {
      //element = data[2]

      //console.log({ BridgePort: element })
      for (let i = 0; i <= data.length - 1; i++) {
        //3496
        element = data[i]
        element['i'] = i
        //console.log({ bridge: data.length })
        //console.log(element)
        //data.map((element) => {
        await server.client
          .table('BridgePort')
          .row(` ${element.ObjectID}`)
          .put(
            [
              'Bridgefamily:DnDiscByteCounter',
              'Bridgefamily:DnDiscFrameCounter',
              'Bridgefamily:DnFwdByteCounter',
              'Bridgefamily:DnFwdFrameCounter',
              'Bridgefamily:TimeMeasured',
              'Bridgefamily:UpDiscByteCounter',
              'Bridgefamily:UpDiscFrameCounter',
              'Bridgefamily:UpFwdByteCounter',
              'Bridgefamily:UpFwdFrameCounter',
            ],
            [
              ` ${element.extendPortTotalPrevious15MinDnDiscByteCounter}`,
              ` ${element.extendPortTotalPrevious15MinDnDiscFrameCounter}`,
              ` ${element.extendPortTotalPrevious15MinDnFwdByteCounter}`,
              ` ${element.extendPortTotalPrevious15MinDnFwdFrameCounter}`,
              ` ${element.extendPortTotalPrevious15MinTimeMeasured}`,
              ` ${element.extendPortTotalPrevious15MinUpDiscByteCounter}`,
              ` ${element.extendPortTotalPrevious15MinUpDiscFrameCounter}`,
              ` ${element.extendPortTotalPrevious15MinUpFwdByteCounter}`,
              ` ${element.extendPortTotalPrevious15MinUpFwdFrameCounter}`,
            ],
            element.timestamp.getMilliseconds(),
            function (err, success) {
              // console.log('error', { BridgePort: err })
              console.log('success', { BridgePort: success })
              if (success === null) {
                console.log({ i: i })
                console.log({ element: element })
              }
            }
          )
        //})
      }
      console.log('end')
    })*/
}

var sendONTAggGem = (data) => {
  sendToDb.sendToMongoDb('mydb', 'ONTAggGem', data)
  /* server.client
    .table('ONTAggGem')
    .create('ONTAggfamily', function (err, success) {
      console.log('start')
      //element = data[2]
      //console.log({ ONTAggGem: element })
      for (let i = 0; i <= data.length - 1; i++) {
        //1006
        element = data[i]
        element['i'] = i
        //console.log({ ONTAggGem: data.length })
        //console.log(element)
        //data.map((element) => {
        server.client
          .table('ONTAggGem')
          .row(` ${element.ObjectID}`)
          .put(
            [
              'ONTAggfamily:IntervalReceiveBlocksCounter64',
              'ONTAggfamily:IntervalReceiveFrags',
              'ONTAggfamily:IntervalTransmitBlocksCounter64',
              'ONTAggfamily:IntervalTransmitFrags',
            ],
            [
              ` ${element.gponOntOntsideAggGemIntervalReceiveBlocksCounter64}`,
              ` ${element.gponOntOntsideAggGemIntervalReceiveFrags}`,
              ` ${element.gponOntOntsideAggGemIntervalTransmitBlocksCounter64}`,
              ` ${element.gponOntOntsideAggGemIntervalTransmitFrags}`,
            ],
            element.timestamp.getMilliseconds(),
            function (err, success) {
              //console.log('error', { ONTAggGem: err })
              console.log('success', { ONTAggGem: success })
              if (success === null) {
                console.log({ element: element, i: i })
              }
            }
          )
        // })
      }
      console.log('end')
    })*/
}

var sendvlanPort = (data) => {
  sendToDb.sendToMongoDb('mydb', 'vlanPort', data)
  /* server.client.table('VlanPort').create('Vlanfamily', function (err, success) {
    console.log('start')
    //element = data[2]
    //console.log({ VlanPort: element })
    //data.map((element) => {
    for (let i = 0; i <= data.length - 1; i++) {
      element = data[i]
      element['i'] = i
      //5239
      //console.log({ VlanPort: data.length })
      //console.log(element)
      server.client
        .table('VlanPort')
        .row(` ${element.ObjectID}`)
        .put(
          [
            'Vlanfamily:DnDiscByteCounter',
            'Vlanfamily:DnDiscFrameCounter',
            'Vlanfamily:DnFwdByteCounter',
            'Vlanfamily:DnFwdFrameCounter',
            'Vlanfamily:UpDiscByteCounter',
            'Vlanfamily:UpDiscFrameCounter',
            'Vlanfamily:UpFwdByteCounter',
            'Vlanfamily:UpFwdFrameCounter',
          ],
          [
            ` ${element.extendPortVlanPrevious15MinDnDiscByteCounter}`,
            ` ${element.extendPortVlanPrevious15MinDnDiscFrameCounter}`,
            ` ${element.extendPortVlanPrevious15MinDnFwdByteCounter}`,
            ` ${element.extendPortVlanPrevious15MinDnFwdFrameCounter}`,
            ` ${element.extendPortVlanPrevious15MinUpDiscByteCounter}`,
            ` ${element.extendPortVlanPrevious15MinUpDiscFrameCounter}`,
            ` ${element.extendPortVlanPrevious15MinUpFwdByteCounter}`,
            ` ${element.extendPortVlanPrevious15MinUpFwdFrameCounter}`,
          ],
          element.timestamp.getMilliseconds(),
          function (err, success) {
            /// console.log('error', { VlanPort: err })
            console.log('success', { VlanPort: success })
            if (success === null) {
              console.log({ i: i })
              console.log({ element: element })
            }
          }
        )
      //})
    }
    console.log('end')
  })*/
}

var send = (data, index) => {
  switch (index) {
    case 0:
      sendBridgePort(data)
      break

    case 1:
      sendONTAggGem(data)
      break
    case 2:
      sendvlanPort(data)
      break
    default:
      console.log('not mentionned')
  }
}

module.exports = { send }
