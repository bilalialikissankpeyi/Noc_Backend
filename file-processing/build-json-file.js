const index3 = require('../index3.js')
const csv = require('csvtojson')
const fs = require('fs')
var buildJsonObject = (time, pathTofile) =>
  new Promise((resolve, reject) => {
    // console.log({ time: time, timeml: time.getMilliseconds() })
    csv()
      .fromFile(pathTofile)
      .then((array) => {
        array.map((line, index) => {
          // line = { ...line, time: time, olt: addData[1] }
          line = { ...line, timestamp: time }
          array[index] = line
        })
        /*var file = fs.createWriteStream(pathTofile)
        file.on('error', function (err) {
          /* error handling 
        })
        arr.forEach(function (v) {
          file.write(v.join(', ') + '\n')
        })
        file.end()*/
        resolve(array)
      })
  })
module.exports = { buildJsonObject }
