var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  var final_collection
  switch (collection) {
    case 'BridgePort':
      final_collection = BridgePort
      break
    case 'ONTAggGem':
      final_collection = OntAggGem
      break
    case 'vlanPort':
      final_collection = vlanPort
      break
    case 'CpuUsage':
      final_collection = CpuUsage
      break
    case 'EthernetPort':
      final_collection = EthernetPort
      break
    case 'ISAM_ONT':
      final_collection = Ont
      break
    case 'OntEthPort':
      final_collection = OntEthPort
      break
    case 'OntVeipPort':
      final_collection = OntVeipPort
      break
    case 'Pon':
      final_collection = Pon
      break
    case 'Uni':
      final_collection = Uni
      break
    case 'VlanPortAssociation':
      final_collection = VlanPortAssociation
      break
    default:
  }
  mongoose
    .connect(url)
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('here')
        final_collection
          .aggregate([
            { ObjectID: { $regex: ObjectName } },
            { 'data.olt': olt },
            { 'data.timestamp': { $lte: last } },
          ])
          /*.aggregate([
            { $match: { ObjectID: { $regex: ObjectName } } },
            {
              $project: {
                data: {
                  $filter: {
                    input: '$data',
                    as: 'index',
                    cond: {
                      $and: { $gte: ['$$index.timestamp', last] },
                    },
                  },
                },
              },
            },
          ])*/
          .then((result) => {
            console.log(result[0].data)
          })
      })
    })
    .catch(console.log)
}
///Get ONT activities INTO a last interval of time
var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  var final_collection
  switch (collection) {
    case 'BridgePort':
      final_collection = BridgePort
      break
    case 'ONTAggGem':
      final_collection = OntAggGem
      break
    case 'vlanPort':
      final_collection = vlanPort
      break
    case 'CpuUsage':
      final_collection = CpuUsage
      break
    case 'EthernetPort':
      final_collection = EthernetPort
      break
    case 'ISAM_ONT':
      final_collection = Ont
      break
    case 'OntEthPort':
      final_collection = OntEthPort
      break
    case 'OntVeipPort':
      final_collection = OntVeipPort
      break
    case 'Pon':
      final_collection = Pon
      break
    case 'Uni':
      final_collection = Uni
      break
    case 'VlanPortAssociation':
      final_collection = VlanPortAssociation
      break
    default:
  }
  console.log('haha')
  mongoose
    .connect(url)
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('here')
        final_collection
          .find({ $regex: { ObjectID: ObjectName } })
          .select({
            data: { $elemMatch: { olt, timestamp: { $gte: new Date(last) } } },
          })
          .then((result) => {
            console.log(result[0].data)
            resolve(result)
          })
          .catch(console.log)
      })
    })
    .catch(console.log)
}
///Query 15 minutes Data (Bridge,ONTAgg,Vlan)

///Get ONT activities INTO a last interval of time
var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  var query = {
    $and: [
      { ObjectID: new Regex(ObjectName) },
      { 'data.olt': olt },
      { 'data.timestamp': { $gte: new Date(last) } },
    ],
  }
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err
      var dbo = db.db(`${dbname}`)
      dbo
        .collection(`${collection}`)
        .aggregate([
          // Get just the docs that contain a shapes element where color is 'red'
          { $match: query },
          {
            $project: {
              data: {
                $filter: {
                  input: '$data',
                  as: 'value',
                  cond: {
                    $eq: ['$$value.timestamp', { $gte: new Date(last) }],
                  },
                },
              },
              _id: 0,
            },
          },
        ])
        .toArray(function (err, result) {
          if (err) throw err
          resolve(result)
          //      console.log(result)
          db.close()
        })
      /*.find(query, {
          _id: 0,
          data: { $elemMatch: { timestamp: { $gte: new Date(last) } } },
        })
        .toArray(function (err, result) {
          if (err) throw err
          resolve(result)
          //      console.log(result)
          db.close()
        })*/
    })
  })

  findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
    resolve(res)
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
        { ObjectID: ObjectName },
        { 'data.olt': olt },
        {
          'data.timestamp': {
            $gte: new Date(startdate),
            $lte: new Date(enddate),
          },
        },
      ],
    }

    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      console.log(res)
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
    console.log('is different')
    collections.map((collection, i) => {
      RequestTimeFrameData(
        dbname,
        collection,
        ObjectName,
        startdate,
        enddate,
        olt
      ).then((res) => {
        result.push({ result: res, collection: `${collection}` })
        console.log(`${collection}`, res)
        if (i === collections.length - 1) {
          resolve(result)
        }
      })
    })
    /*if (!enddate) {
      collections.map(async (collection, i) => {
        await RequestLastData(
          dbname,
          collection,
          ObjectName,
          startdate,
          olt
        ).then((res) => {
          result.push({ result: res, collection: `${collection}` })
          if (i === collections.length - 1) {
            resolve(result)
          }
        })
      })
    } else {
      
    }*/
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
        //{ ObjectID: new RegExp(ObjectName) },
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
var findMultipleEntries = async (dbname, collection, query) => {
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
/*var executeMe = async () => {
  var result = await MultipleCollectionRequest(
    'mydb',
    ['VlanPortAssociation', 'OntVeipPort', 'ISAM_ONT', 'OntEthPort'],
    'MINA-7360FX8:R1.S1.LT8.PON7.ONT6',
    new Date('2021-11-15T22:00:00.885Z'),
    new Date('2021-11-15T22:30:00.885Z'),
    'MINA-7360FX8'
  )
  console.log({ result: result })
}
executeMe()
*/ /*
RequestLastData(
  'mydb',
  'ISAM_ONT',
  'MINA-7360FX8',
  new Date('2021-11-15T22:00:00.885Z'),
  'MINA-7360FX8'
).then((res) => {
  console.log({ res: res[0].data })
})
//new Date('Mon, 15 Nov 2021 22:01:00 GMT')
listenToChanges()
  new Date('2021-10-14T07:17:00.885Z'),
  new Date('2021-10-14T07:32:00.885Z'),

RequestTimeFrameData(
  'mydb',
  'OntEthPort',
  'MINA-7360FX8:R1.S1.LT3.PON6.ONT26',
  '2021-11-15T21:45:00.451+00:00',
  '2021-11-15T22:45:00.451+00:00',
  'MINA-7360FX8'
)*/
/*RequestLastData(
  'mydb',
  'CpuUsage',
  'MINA-7360FX8',
  new Date(2021, 10, 13, 6, 0, 0),
  'MINA-7360FX8'
)*/
module.exports = {
  findCollection,
  RequestLastData,
  RequestTimeFrameData,
  MultipleCollectionRequest,
  findMultipleEntries,
  findUserRecordsInTime,
  findUserCollection,
  findSumOf,
  findRelatedONT,
  updateCollection,
} /*
/* {
            bponOntEquipId: `${element.bponOntEquipId}`,
            bponOntSerialNumber: `${element.bponOntSerialNumber}`,
            bponOntSubscriberId1: `${element.bponOntSubscriberId1}`,
            bponOntSubscriberLocId: `${element.bponOntSubscriberLocId}`,
          },*/

/*var RequestTimeFrameData = async (
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
        { ObjectID: ObjectName },
        { 'data.olt': olt },
        {
          'data.timestamp': {
            $gte: new Date(startdate),
            $lte: new Date(enddate),
          },
        },
      ],
    }

    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      console.log(res)
      resolve(res)
    })
  })
}*/

/*
///Get All connected User Number at a time
var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  return new Promise((resolve, reject) => {
    var query = {
      $and: [
        //{ ObjectID: new RegExp(ObjectName) },
        { 'data.olt': new RegExp(olt) },
        { 'data.timestamp': { $gte: new Date(last) } },
      ],
    }
    findMultipleEntries(`${dbname}`, `${collection}`, query).then((res) => {
      resolve(res)
    })
  })
}
*/
/* {
            bponOntEquipId: `${element.bponOntEquipId}`,
            bponOntSerialNumber: `${element.bponOntSerialNumber}`,
            bponOntSubscriberId1: `${element.bponOntSubscriberId1}`,
            bponOntSubscriberLocId: `${element.bponOntSubscriberLocId}`,
          },*/

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
/*var executeMe = async () => {
  var result = await MultipleCollectionRequest(
    'mydb',
    ['VlanPortAssociation', 'OntVeipPort', 'ISAM_ONT', 'OntEthPort'],
    'MINA-7360FX8:R1.S1.LT8.PON7.ONT6',
    new Date('2021-11-15T22:00:00.885Z'),
    new Date('2021-11-15T22:30:00.885Z'),
    'MINA-7360FX8'
  )
  console.log({ result: result })
}
executeMe()
*/
RequestLastData(
  'mydb',
  'ISAM_ONT',
  'MINA-7360FX8',
  new Date('2021-11-15T22:00:00.885Z'),
  'MINA-7360FX8'
).then((res) => {
  console.log({ res: res[0].data })
})
//new Date('Mon, 15 Nov 2021 22:01:00 GMT')
listenToChanges()
  new Date('2021-10-14T07:17:00.885Z'),
  new Date('2021-10-14T07:32:00.885Z'),

RequestTimeFrameData(
  'mydb',
  'OntEthPort',
  'MINA-7360FX8:R1.S1.LT3.PON6.ONT26',
  '2021-11-15T21:45:00.451+00:00',
  '2021-11-15T22:45:00.451+00:00',
  'MINA-7360FX8'
)*/


///NFAFNK
/*var RequestLastData = async (dbname, collection, ObjectName, last, olt) => {
  var final_collection
  switch (collection) {
    case 'BridgePort':
      final_collection = BridgePort
      break
    case 'ONTAggGem':
      final_collection = OntAggGem
      break
    case 'vlanPort':
      final_collection = vlanPort
      break
    case 'CpuUsage':
      final_collection = CpuUsage
      break
    case 'EthernetPort':
      final_collection = EthernetPort
      break
    case 'ISAM_ONT':
      final_collection = Ont
      break
    case 'OntEthPort':
      final_collection = OntEthPort
      break
    case 'OntVeipPort':
      final_collection = OntVeipPort
      break
    case 'Pon':
      final_collection = Pon
      break
    case 'Uni':
      final_collection = Uni
      break
    case 'VlanPortAssociation':
      final_collection = VlanPortAssociation
      break
    default:
  }
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        console.log('here')
        final_collection
          .aggregate([
            //{ $regex: { ObjectID: ObjectName } },
            { $match: { ObjectID: { $regex: ObjectName } } },
            {
              $project: {
                data: {
                  $filter: {
                    input: '$data',
                    as: 'index',
                    cond: {
                      $and: { $gte: ['$$index.timestamp', last] },
                    },
                  },
                },
              },
            },
          ])
          .then((result) => {
            console.log(result[0].data.length)
            console.log(result[1].data.length)
            console.log(result[2].data.length)
            console.log(result[3].data.length)
            resolve(result)
          })
      })
      .catch(console.log)
  })
} */