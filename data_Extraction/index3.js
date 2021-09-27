var targz = require('targz')
var fs = require('fs')
const csv = require('csvtojson')
const path = require('path')

const decompressedFolderPath = './decompressed'

let addData

var decompressFile = async (compressFilePath, csvFilePath) => {
  var dec = false
  return new Promise((resolve, reject) => {
    targz.decompress(
      {
        src: compressFilePath,
        dest: decompressedFolderPath + '/' + compressFilePath.split('.')[0],
      },
      async (err) => {
        if (
          !dec &&
          String(err).startsWith(
            'Error: Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?'
          )
        ) {
          console.log('mememe1')
          dec = true
          var tab = await maping(
            csvFilePath,
            decompressedFolderPath + '/' + compressFilePath.split('.')[0]
          )
          return resolve(tab)
        } else if (!dec) {
          console.log('mememe')
          var tab = await maping(
            csvFilePath,
            decompressedFolderPath + '/' + compressFilePath.split('.')[0]
          )
          return resolve(tab)
          console.log('Done!')
        }
      }
    )
  })
}

var extracHeaders = async (pathTofile) => {
  const fullString = fs.readFileSync(pathTofile, {
    encoding: 'utf-8',
    flag: 'r',
  })

  //console.log(pathTofile, fullString)

  var ar = fullString.split('\n').slice(0, 4)

  //  console.log('thissss', pathTofile)
  //console.log(ar)

  if (ar.length >= 3) {
    var res = [ar[0].split(',')[1], ar[2].split(',')[1]]
    addData = res
  }
  //console.log('data extracted', fullString.split('\n').slice(5))
  return fullString.split('\n').slice(5)
}

var writeIntoTheFile = (pathTofile, fullstring) => {
  //console.log('the full', fullstring[1])
  fullstring[0] = fullstring[0].split(' ')[0] + fullstring[0].split(' ')[1]
  //console.log(fullstring[0])
  fs.writeFileSync(pathTofile, fullstring.join('\n'))
}

var outputJsonObject2 = async (pathTofile, userONT) => {
  var filtedObject = []
  await csv()
    .fromFile(pathTofile)
    .then((jsonObj) => {
      jsonObj.map((line, index) => {
        line = { ...line, time: addData[0], olt: addData[1] }
        jsonObj[index] = line
      })
      return jsonObj
    })
    .then((res) => {
      filtedObject = res.filter((object) => object.ObjectID.includes(userONT))
      // console.log('filter :')
      //console.log(filtedObject)
    })
  //console.log({ filtedObject })
  return filtedObject
}

var outputJsonObject = (pathTofile, userONT) =>
  new Promise((resolve, reject) => {
    csv()
      .fromFile(pathTofile)
      .then((array) => {
        console.log({ before: array.length })
        array.map((line, index) => {
          line = { ...line, time: addData[0], olt: addData[1] }
          array[index] = line
        })
        console.log(
          'stoped',
          array.filter((object) => object.ObjectID.includes(userONT))
        )
        var filtedObject = array.filter((object) =>
          object.ObjectID.includes(userONT)
        )
        console.log({ filtedObject: filtedObject.length })
        resolve(filtedObject)
      })
  })

var maping = async (csvFilePath, root) => {
  var routes = []
  for (let i = 0; i < csvFilePath.length; i += 1) {
    var pathTofile = `${root}/${csvFilePath[i]}`
    let res = await encapExtract(pathTofile, i, root)
    writeIntoTheFile(pathTofile, res.data)
    routes.push(pathTofile)
  }
  routes = await Promise.all(routes)
  //console.log({ route: routes })
  return routes
}

var encapExtract = async (pathTofile, i, root) => {
  if (fs.existsSync(pathTofile)) {
    var data = null
    data = await extracHeaders(pathTofile)
  }
  return { data, i }
}

module.export = {
  decompressFile,
  outputJsonObject,
  writeIntoTheFile,
}
