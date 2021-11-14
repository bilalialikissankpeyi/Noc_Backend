const sendToDb = require('./sendToDb')
var sendEthernetPort = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'EthernetPort', data)
}

var sendCpuUsage = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'CpuUsage', data)
}

var sendEthernetLinesLot = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'EthernetLinesLot', data)
}

var sendISAM_ONT = (data) => {
  console.log('first')
  sendToDb.pushIntoSubcollection('mydb', 'ISAM_ONT', data)
}

var sendOntEthPort = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'OntEthPort', data)
}

var sendOntVeipPort = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'OntVeipPort', data)
}

var sendPon = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'Pon', data)
}

var sendUni = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'Uni', data)
}

var sendVlanPortAssociation = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'VlanPortAssociation', data)
}

var addTotheCollection = (data, index) => {
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

module.exports = { addTotheCollection }
