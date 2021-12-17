var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

var sendToMongoDb = (dbname, collection, data) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      console.log('never1', data.length)
      if (data.length !== 0) {
        var dbo = db.db(dbname)
        dbo.collection(collection).insertMany(data, function (err, res) {
          if (err) throw err
          console.log('never2')
          console.log('Number of documents inserted: ' + res.insertedCount)
          db.close()
        })
      }
    })
  })
}
var pushIntoSubcollection = (dbname, collection, array) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      //console.log('sthg')
      var dbo = db.db(dbname)
      array.map((data, i) => {
        var ObjectName = data.ObjectName
        delete data.ObjectName
        delete data.ObjectID
        noObjectID = data
        var query = { ObjectID: new RegExp(ObjectName) }
        var newvalue = {
          $set: { ObjectID: ObjectName },
          $push: {
            data: noObjectID,
          },
        }
        dbo
          .collection(collection)
          .updateOne(query, newvalue, { upsert: true }, function (err, res) {
            if (err) throw err
            //console.log('added', res)
            if (i === data.length - 1) {
              db.close()
            }
          })
      })
    })
  })
}

var addUserToDb = (csvdata, csv2data, onts) => {
  result = csvdata.filter((row) => {
    return !onts.some((ont) => {
      row.ObjectID === ont.ObjectName.split(':')[1]
    })
  })
  result2 = []
  csv2data.filter((row2) => {
    return result.some((ont) => {
      if (
        row2.ObjectID.includes(ont.ObjectID) &&
        row2.ObjectID.slice(-1) === '1'
      ) {
        result2.push({ ...ont, asamIfExtCustomerId: row2.asamIfExtCustomerId })
      }
    })
  })
  if (result2.length != 0) {
    sendToMongoDb('mydb', 'ONT_INFO', result2)
  }
  /*csvdata.forEach((row, y) => {
    var data = {
      ObjectID: row.ObjectID,
      bponOntEquipId: row.bponOntEquipId,
      bponOntSerialNumber: row.bponOntSerialNumber,
      bponOntSubscriberId1: row.bponOntSubscriberId1,
      bponOntSubscriberLocId: row.bponOntSubscriberLocId,
    }
    csv2data.forEach(async (row2) => {
      if (
        row2.ObjectID.toString().includes(row.ObjectID) &&
        row2.asamIfExtCustomerId !== 'available'
      ) {
        //console.log('row2.asam', row2.asamIfExtCustomerId)
        data = {
          ...data,
          asamIfExtCustomerId: row2.asamIfExtCustomerId,
        }
      }
    })
    var newvalue = {
      $set: {
        ObjectID: `${data.ObjectID}`,
        bponOntEquipId: `${data.bponOntEquipId}`,
        bponOntSerialNumber: `${data.bponOntSerialNumber}`,
        bponOntSubscriberId1: `${data.bponOntSubscriberId1}`,
        bponOntSubscriberLocId: `${data.bponOntSubscriberLocId}`,
        asamIfExtCustomerId: `${data.asamIfExtCustomerId}`,
      },
    }
    var query = { ObjectName: new RegExp(data.ObjectID) }
    findInDb
      .updateCollection('mydb', 'ONT_INFO', query, newvalue)
      .then((result) => {
        console.log('ended', 'success', result)
      })
  })*/
}
/*
pushIntoSubcollection('mydb', 'BridgePort', {
  ObjectID: '',
  ObjectName: 'ADIDO-7360-FX8:R1.S1.LT8.PON15.ONT44',
  'Down Discard Byte': '0',
  'Down Discard Frame': '0',
  'Down Foward Byte': '0',
  'Down Foward Frame': '0',
  'Time Measured': '900',
  'Up Discard Byte': '0',
  'Up Discard Frame': '0',
  'Up Foward Byte': '0',
  'Up Foward Frame': '0',
  timestamp: '2021-10-14T07:30:01.011+00:00',
  olt: 'ADIDO-7360-FX8',
  type: 'SERV1',
})*/
module.exports = { sendToMongoDb, pushIntoSubcollection, addUserToDb }
