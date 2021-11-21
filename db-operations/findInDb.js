var MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const models = require('./models')
var url = 'mongodb://localhost:27017/mydb'
const { model, Schema } = mongoose

const CpuUsage = model('CpuUsage', models.CpuUsageschema, 'CpuUsage')
const BridgePort = model('BridgePort', models.BridgePortschema, 'BridgePort')
const OntAggGem = model('ONTAggGem', models.OntAggGemschema, 'ONTAggGem')
const vlanPort = model('vlanPort', models.vlanPortschema, 'vlanPort')
const EthernetPort = model(
  'EthernetPort',
  models.EthernetPortschema,
  'EthernetPort'
)
const OntEthPort = model('OntEthPort', models.OntEthPortschema, 'OntEthPort')
const Ont = model('Ontschema', models.Ontschema, 'ISAM_ONT')
const OntVeipPort = model(
  'OntVeipPort',
  models.OntVeipPortschema,
  'OntVeipPort'
)
const Pon = model('Pon', models.Ponschema, 'Pon')
const Uni = model('Uni', models.Unischema, 'Uni')
const VlanPortAssociation = model(
  'VlanPortAssociation',
  models.VlanPortAssociationschema,
  'VlanPortAssociation'
)

//
var DashBoardLastData = async (collection, last) => {
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
    console.log('haha')
    mongoose
      .connect(url)
      .then(() => {
        console.log('here')
        final_collection
          .find()
          .select({
            ObjectID: 1,
            data: { $elemMatch: { timestamp: { $gte: new Date(last) } } },
          })
          .then((result) => {
            console.log(result[0].data.length)
            resolve(result)
          })
          .catch(console.log)
      })
      .catch(console.log)
  })
}

//
///Query 15 minutes Data (Bridge,ONTAgg,Vlan)

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
  return new Promise((resolve, reject) => {
    console.log('haha')
    mongoose
      .connect(url)
      .then(() => {
        console.log('here')
        final_collection
          .find({ $regex: { ObjectID: ObjectName } })
          .select({
            ObjectID: 1,
            data: { $elemMatch: { olt, timestamp: { $gte: new Date(last) } } },
          })
          .then((result) => {
            console.log(result[0].data.length)
            resolve(result)
          })
          .catch(console.log)
      })
      .catch(console.log)
  })
}
/*
var last = new Date('13 December 2021 06:00 UTC')
console.log(last.toISOString())
RequestLastData(
  'mydb',
  'CpuUsage',
  'MINA-7360FX8:',
  new Date(last.toISOString()),
  'MINA-7360FX8'
)*/
///Get ONT activities INTO a time FRAME

var RequestTimeFrameData = async (
  dbname,
  collection,
  ObjectName,
  startdate,
  enddate,
  olt
) => {
  console.log(collection)
  var final_collection
  var d1s = new Date(startdate)
  var d2s = new Date(enddate)
  var end = new Date(d2s.toISOString())
  var start = new Date(d1s.toISOString())
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
        console.log(final_collection)
        final_collection
          .aggregate([
            { $match: { ObjectID: ObjectName } },
            {
              $project: {
                ObjectID: 1,
                data: {
                  $filter: {
                    input: '$data',
                    as: 'index',
                    cond: {
                      $and: [
                        {
                          $gte: ['$$index.timestamp', start],
                        },
                        {
                          $lte: ['$$index.timestamp', end],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ])
          .then((result) => {
            //console.log(result[0].data)
            resolve(result)
          })
      })
      .catch(console.log)
  })
}
/*
start = new Date('13 December 2021 01:00 UTC')
end = new Date('13 December 2021 02:02: UTC')*/

//console.log(start.toISOString())
/*RequestTimeFrameData(
  'mydb',
  'OntEthPort',
  'MINA-7360FX8:R1.S1.LT8.PON2.ONT32',
  new Date(start.toISOString()),
  new Date(end.toISOString()),
  'MINA-7360FX8'
)*/
/*new Date('2021-12-13T01:01:00.499+00:00'),
  new Date('2021-12-13T02:01:00.023+00:00'),*/
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
  console.log('lolll')
  return new Promise((resolve, reject) => {
    MongoClient.connect('mongodb://localhost:27017/', function (err, db) {
      if (err) throw err
      var dbo = db.db('mydb')
      dbo
        .collection(`${collection}`)
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err
          console.log('le resultat', result.length)
          resolve(result)

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

module.exports = {
  findCollection,
  RequestLastData,
  RequestTimeFrameData,
  findMultipleEntries,
  findUserRecordsInTime,
  findUserCollection,
  findSumOf,
  findRelatedONT,
  updateCollection,
  DashBoardLastData,
}
