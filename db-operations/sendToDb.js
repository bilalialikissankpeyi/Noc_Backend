var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

var sendToMongoDb = (dbname, collection, data) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err
    var dbo = db.db(dbname)
    dbo.collection(collection).insertMany(data, function (err, res) {
      if (err) throw err
      console.log('Number of documents inserted: ' + res.insertedCount)
      db.close()
    })
  })
}

module.exports = { sendToMongoDb }
