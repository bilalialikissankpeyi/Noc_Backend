var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

///Query 15 minutes Data (Bridge,ONTAgg,Vlan)

///Get ONT activities INTO a last interval of time
var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  return new Promise((resolve, reject) => {
    var query = {
      $and: [
        { ObjectID: new RegExp(ObjectName) },
        { 'data.olt': new RegExp(olt) },
        { 'data.timestamp': { $gte: new Date(last) } },
      ],
    }
    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      resolve(res)
    })
  })
}

///Get ONT activities INTO a time FRAME
var RequestTimeFrameData = async (
  dbname,
  collection,
  ObjectName,
  startdate,
  enddate,
  olt
) => {
  return new Promise((resolve, reject) => {
    var query = {
      $and: [
        { ObjectID: new RegExp(ObjectName) },
        { 'data.olt': new RegExp(olt) },
        {
          'data.timestamp': {
            $gte: new Date(startdate),
            $lte: new Date(enddate),
          },
        },
      ],
    }
    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      resolve(res)
    })
  })
}

///RequestMultiplesCollectionData
var MultipleCollectionRequest = async (
  dbname,
  collections,
  ObjectName,
  startdate,
  enddate,
  olt
) => {
  return new Promise((resolve, reject) => {
    var result = []
    if (enddate) {
      collections.map((collection) => {
        RequestTimeFrameData(
          dbname,
          collection,
          ObjectName,
          startdate,
          enddate,
          olt
        ).then((res) => {
          result.push({ collection: res })
        })
      })
    } else {
      collections.map((collection) => {
        RequestLastData(dbname, collection, ObjectName, startdate, olt).then(
          (res) => {
            result.push({ collection: res })
          }
        )
      })
    }
    resolve(result)
  })
}

var listenToChanges = async () => {
  /*var client = await MongoClient.connect('mongodb://localhost:27017/')
  var db = client.db('mydb')
  const collection = db.collection('Ont')
  const pipeline = { ifAdminStatus: 'down' }
  const changeStream = collection.watch(pipeline)
  changeStream.on('create', function (change) {
    console.log(change)
  })*/
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db('mydb')
    //var query = { cle: value }
    const collection = dbo.collection('Ont')

    const pipeline = [
      { $and: [{ ifAdminStatus: 'down' }, { operationType: 'insert' }] },
    ]

    const changeStream = collection.watch(pipeline)
    changeStream.on('insert', function (change) {
      console.log(change)
    })
  })

  // start listen to changes
}

///Get All connected User Number at a time
var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  return new Promise((resolve, reject) => {
    var query = {
      $and: [
        { ObjectID: new RegExp(ObjectName) },
        { 'data.olt': new RegExp(olt) },
        { 'data.timestamp': { $gte: new Date(last) } },
      ],
    }
    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      resolve(res)
    })
  })
}

///Update User Informations

var updateCollection = (dbname, collection, query, data) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db(`${dbname}`)
      dbo
        .collection(`${collection}`)
        .updateOne(query, data, { upsert: true }, function (err, result) {
          if (err) throw err
          console.log('the error', err)
          resolve(result)
          db.close()
        })
    })
  })
}

var findCollection = (dbname, collection, query) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db(`${dbname}`)
      //var query = { cle: value }
      dbo.collection(`${collection}`).findOne(query, function (err, result) {
        if (err) throw err
        //console.log(result)
        resolve(result)
        db.close()
      })
    })
  })
}
findMultipleEntries = (dbname, collection, query) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db(`${dbname}`)
      dbo
        .collection(`${collection}`)
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err
          resolve(result)
          //      console.log(result)
          db.close()
        })
    })
  })
}

var findSumOf = async (dbname, collection, regular, startdate, enddate) => {
  return new Promise((resolve, reject) => {
    var query = {
      $and: [
        { ObjectID: new RegExp(regular) },
        { timestamp: { $gte: new Date(startdate), $lte: new Date(enddate) } },
      ],
    }
    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      var somme = 0
      resolve(res)
      /*res.map((element, index) => {
        somme += parseFloat(element[sumof].toString())
        if (index === res.length - 1) {
          resolve(somme)
        }
      })*/
    })
  })
}

var findUserCollection = async (dbname, collection, serialNumber) => {
  return new Promise((resolve, reject) => {
    findCollection(`${dbname}`, `${collection}`, {
      $or: [
        { SerialNumber: new RegExp(serialNumber) },
        { SubscriberLocationID: new RegExp(serialNumber) },
        { DescriptionPart2: new RegExp(serialNumber) },
        { DescriptionPart1: new RegExp(serialNumber) },
      ],
    }).then((result) => {
      resolve(result)
    })
  })
}
var findUserRecordsInTime = async (
  dbname,
  collection,
  ObjectName,
  startdate,
  enddate,
  olt
) => {
  return new Promise((resolve, reject) => {
    var query = {
      $and: [
        { ObjectID: new RegExp(ObjectName) },
        { olt: new RegExp(olt) },
        { timestamp: { $gte: new Date(startdate), $lte: new Date(enddate) } },
      ],
    }
    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      resolve(res)
    })
  })
}

var findRelatedONT = async (dbname, collection, query) => {
  return new Promise((resolve, reject) => {
    var queri = { ObjectName: new RegExp(query) }
    findMultipleEntries(`${dbname}`, `${collection}`, queri).then((res) => {
      resolve(res)
    })
  })
}
/*findUserRecord()*/
/*findSumOf(
  'mydb',
  'ONTAggGem',
  'R1.S1.LT8.PON15.ONT44',
  new Date('2021-10-14T06:30:00.885Z'),
  new Date('2021-10-14T08:00:00.885Z')
).then((res) => {
  console.log(res)
})*/
listenToChanges()
module.exports = {
  findCollection,
  findMultipleEntries,
  findUserRecordsInTime,
  findUserCollection,
  findSumOf,
  findRelatedONT,
  updateCollection,
}
/* {
            bponOntEquipId: `${element.bponOntEquipId}`,
            bponOntSerialNumber: `${element.bponOntSerialNumber}`,
            bponOntSubscriberId1: `${element.bponOntSubscriberId1}`,
            bponOntSubscriberLocId: `${element.bponOntSubscriberLocId}`,
          },*/
