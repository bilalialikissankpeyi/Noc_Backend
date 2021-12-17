const sendToDb = require('./sendToDb')

var sendVlanPortAssociation = (data) => {
  sendToDb.pushIntoSubcollection('mydb', 'VlanPortAssociation', data)
}
var addTotheCollection = (data, index) => {
  switch (index) {
    case 0:
      sendVlanPortAssociation(data)
      break
    default:
      console.log('not mentionned')
  }
}

module.exports = { addTotheCollection }
