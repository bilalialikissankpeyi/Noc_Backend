var targz = require('targz')
var fs = require('fs')
const csv = require('csvtojson')
const path = require('path')
const csvFilePath = [
  'iSAM_bridgePort15MinHistoryData.csv',
  'iSAM_ontOntAggGem15MinHistoryData.csv',
  'iSAM_vlanPortAssociation15MinHistoryData.csv',
]

const decompressedFolderPath = './decompressed'

// ParseServer
const Parse = require('parse/node')
// ES6 Minimized
//import Parse from 'parse/dist/parse.min.js'
//import { applicationId, masterKey } from 'parse/node'
Parse.initialize('myAppId', 'myMsterKey')
//javascriptKey is required only if you have it on server.

Parse.serverURL = 'http://localhost:1337/parse'
let addData
decompressFile = (onSuccess, compressFilePath) => {
  console.log('before extract')
  targz.decompress(
    {
      src: compressFilePath,
      dest: decompressedFolderPath + '/' + compressFilePath.split('.')[0],
    },
    function (err) {
      if (err) {
        console.log(err)
      } else {
        onSuccess(decompressedFolderPath + '/' + compressFilePath.split('.')[0])
        console.log('Done!')
      }
    }
  )

  pathTofile = decompressedFolderPath + '/' + compressFilePath.split('.')[0]

  /*if (fs.exists(pathTofile)) {
    console.log('after extract')
  }*/

  return pathTofile
}

extracHeaders = (pathTofile) => {
  const fullString = fs.readFileSync(pathTofile, {
    encoding: 'utf-8',
    flag: 'r',
  })

  ar = fullString.split('\n').slice(0, 4)
  console.log(ar)
  res = [ar[0].split(',')[1], ar[2].split(',')[1]]
  addData = res
  return fullString.split('\n').slice(5)
}

writeIntoTheFile = (pathTofile, fullstring) => {
  console.log(fullstring[1])
  fullstring[0] = fullstring[0].split(' ')[0] + fullstring[0].split(' ')[1]
  console.log(fullstring[0])
  fs.writeFileSync(pathTofile, fullstring.join('\n'))
}

outputJsonObject = (pathTofile, i) => {
  csv()
    .fromFile(pathTofile)
    .then((jsonObj) => {
      jsonObj.map((line, index) => {
        line = { ...line, time: addData[0], olt: addData[1] }
        jsonObj[index] = line
      })
      return jsonObj
    })
    .then((res) => {
      console.log(res)
    })
}

module.export = {
  decompressFile,
  outputJsonObject,
  writeIntoTheFile,
  csvFilePath,
}
