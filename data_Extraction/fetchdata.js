const selectFile = require('./selectFiles.js')
const remoteAccess = require('./remoteAccess.js')
const index3 = require('./index3.js')
var fs = require('fs')
const csvFilePath = [
  'iSAM_bridgePort15MinHistoryData.csv',
  'iSAM_ontOntAggGem15MinHistoryData.csv',
  'iSAM_vlanPortAssociation15MinHistoryData.csv',
]
var minutesObjectToRender = {
  bridgePort: [],
  ontOntAggGem: [],
  vlanPortAssociation: [],
}
var timeSelection = {
  startTime: new Date(2021, 06, 25, 13, 0, 00),
  endTime: new Date(2021, 06, 25, 14, 0, 00),
}
remoteRootFd = 'FTTH_ADSL/'
var userSerial = ''
var userONT = 'R1.S1.LT2.PON13.ONT53'
var userOLT = 'ADIDO-7360-FX8_'
//{ month: pathForMonth, days: pathForDays, minutes: pathForMinutes }

paths = createPath(getPath(timeSelection), userOLT)
console.log('this is paths ' + paths.minutes)

buildRenderObject = async () => {
  for (let i = 0; i < paths.minutes.length; i += 1) {
    const selected = paths.minutes[i]
    await downloadRemoteFiles(remoteRootFd + selected)
    await new Promise((resolve, reject) => {
      decompressFile((root) => {
        //console.log('file' + ' ' + root)
        csvFilePath.map((file, i) => {
          pathTofile = `${root}/${file}`
          //console.log(`file : ${pathTofile}`)
          if (fs.existsSync(pathTofile)) {
            //console.log('this is the path' + pathTofile)
            let data = extracHeaders(pathTofile)
            writeIntoTheFile(pathTofile, data)
            //buildRenderObject(await outputJsonObject(pathTofile, i, userONT), i)
            if (i == 0) {
              ////ICI c'est bon les donnees ont ete envoye
              minutesObjectToRender.bridgePort.push(
                outputJsonObject(pathTofile, i, userONT)
              )
            } else if (i == 1) {
              minutesObjectToRender.ontOntAggGem.push(
                outputJsonObject(pathTofile, i, userONT)
              )
            } else if (i == 2) {
              minutesObjectToRender.vlanPortAssociation.push(
                outputJsonObject(pathTofile, i, userONT)
              )
            }
          }
        })
        resolve()
      }, selected)
    })
  }

  minutesObjectToRender.bridgePort = await Promise.all(
    minutesObjectToRender.bridgePort
  )

  minutesObjectToRender.ontOntAggGem = await Promise.all(
    minutesObjectToRender.ontOntAggGem
  )

  minutesObjectToRender.vlanPortAssociation = await Promise.all(
    minutesObjectToRender.vlanPortAssociation
  )

  ///////////Le tableau est vide ici///////////
  //console.log('this is the render object :')
  //console.log(minutesObjectToRender.bridgePort[0])
  // minutesObjectToRender = await Promise.all(minutesObjectToRender)
  return minutesObjectToRender
}

buildRenderObject().then(() => {
  // console.log('this is the render object :')
  console.log(minutesObjectToRender)
})
