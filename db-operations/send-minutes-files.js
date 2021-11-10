const sendToDb = require('./sendToDb')

var sendBridgePort = async (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'BridgePort', data)
}

var sendONTAggGem = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'ONTAggGem', data)
}

var sendvlanPort = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'vlanPort', data)
}

var addTotheCollection = (data, index) => {
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

module.exports = { addTotheCollection }
