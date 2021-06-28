var targz = require('targz')
var fs = require('fs')
const csv = require('csvtojson')
const path = require('path')
const csvFilePath = [
  'iSAM_ethernetLinesLOT.csv',
  'iSAM_ont.csv',
  'iSAM_ontEthPort.csv',
  'iSAM_ontVeipPort.csv',
  'iSAM_pon.csv',
  'iSAM_uni.csv',
  'iSAM_vlanPortAssociation.csv',
  'isamCpuMemUsage.csv',
]
const compressFilePath = 'iSAM_ont.tar.gz'
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
decompressFile = (onSuccess) => {
  console.log('before extract')
  targz.decompress(
    {
      src: compressFilePath,
      dest: decompressedFolderPath,
    },
    function (err) {
      if (err) {
        console.log(err)
      } else {
        onSuccess(decompressedFolderPath + '/iSAM_ont')
        console.log('Done!')
      }
    }
  )

  pathTofile = decompressedFolderPath + '/iSAM_ont/'

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
        saveToParseServer(line, i)
        jsonObj[index] = line
      })
      return jsonObj
    })
    .then((res) => {
      console.log(res)
    })
}
saveToParseServer = (line, i) => {
  let object = ''
  if (i == 0) {
    object = 'iSAM_ethernetLinesLOT'
  } else if (i == 1) {
    object = 'iSAM_ont'
  } else if (i == 2) {
    object = 'iSAM_ontEthPort'
  } else if (i == 3) {
    object = 'iSAM_ontVeipPort'
  } else if (i == 4) {
    object = 'iSAM_pon'
  } else if (i == 5) {
    object = 'iSAM_uni'
  } else if (i == 6) {
    object = 'iSAM_vlanPortAssociation'
  } else if (i == 7) {
    object = 'isamCpuMemUsage'
  }
  const RandomObject = Parse.Object.extend(object)
  const randomeObject = new RandomObject()
  randomeObject.save(line).then(
    (randomeObject) => {},
    (error) => {
      console.log(error)
    }
  )
}
decompressFile((root) => {
  console.log('file' + ' ' + root)
  csvFilePath.map(
    (file, i) => {
      pathTofile = `${root}/${file}`
      console.log(`file : ${pathTofile}`)
      if (fs.existsSync(pathTofile)) {
        console.log('this is the path' + pathTofile)
        let data = extracHeaders(pathTofile)
        writeIntoTheFile(pathTofile, data)
        outputJsonObject(pathTofile, i)
      }
    },
    (error) => {
      console.log('failled' + err)
    }
  )
})
