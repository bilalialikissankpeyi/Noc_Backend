var selectFile = require('selectFiles.js')
const remoteAccess = require('remoteAccess.js')
const index3 = require('index3.js')
var fs = require('fs')
const path = require('path')
const minutesCsvFilePath = [
  'iSAM_bridgePort15MinHistoryData.csv',
  'iSAM_ontOntAggGem15MinHistoryData.csv',
  'iSAM_vlanPortAssociation15MinHistoryData.csv',
]
var data
const hoursCsvFilePath = [
  'IHUB_ethernetport.csv',
  'iSAM_cpuMemUsage.csv',
  'iSAM_ethernetLineslot.csv',
  'iSAM_ont.csv',
  'iSAM_ontEthPort.csv',
  'iSAM_ontVeipPort.csv',
  'iSAM_pon.csv',
  'iSAM_uni.csv',
  'iSAM_vlanPortAssociationCurrentData.csv',
]
const daysCsvFilePath = ['iSAM_vlanPortAssociation1DayHistoryData.csv']

var timeSelection = {
  startTime: new Date(2021, 6, 25, 13, 0, 0),
  endTime: new Date(2021, 6, 25, 13, 45, 0),
}
var remoteRootFd = 'FTTH_ADSL/'
var userSerial = ''
var userONT = 'R1.S1.LT2.PON13.ONT53'
var userOLT = 'ADIDO-7360-FX8_'
var routeTohours = []
var routeTominutes = []
var routeToDays = []
//{ month: pathForMonth, days: pathForDays, minutes: pathForMinutes }

var select = selectFile.getPath(timeSelection)
var paths = selectFile.createPath(select, userOLT)

var buildRenderObject = async (currentTab, csvFilePath) => {
  var j = 0
  for (let i = 0; i < currentTab.length; i += 1) {
    var selected = currentTab[i]
    await remoteAccess.downloadRemoteFiles(remoteRootFd + selected)
    var root
    root = await index3.decompressFile(selected, csvFilePath)
    return { root: root, selection: selected, index: i }
  }
}

var j = 0
var t = 0

var AllPaths = async () => {
  var minutes = []
  var hours = []
  var days = []
  var root0
  var root1
  var root2
  root0 = await buildRenderObject(paths.minutes, minutesCsvFilePath)
  minutes.push(root0)
  if (root0.index === paths.minutes.length - 1) {
    root1 = await buildRenderObject(paths.hours, hoursCsvFilePath)
    hours.push(root1)
    if (root1.index === paths.hours.length - 1) {
      root2 = await buildRenderObject(paths.days, daysCsvFilePath)
      days.push(root2)
      if (root2.index === paths.days.length - 1) {
        var resultingPath = { minutes: minutes, hours: hours, days: days }
        return resultingPath
      }
    }
  }
}

var getJson = (paths, file) => {
  var filesPath = []
  var res = []
  paths.map((object) => {
    object.root.map((element) => {
      if (element.includes(file)) {
        filesPath.push(element)
      }
    })
  })
  console.log({ hehehhehe: filesPath })

  for (let i = 0; i < filesPath.length; i++) {
    if (fs.existsSync(filesPath[i])) {
      console.log({ chemin: filesPath[i] })
      index3.outputJsonObject(filesPath[i], userONT).then((result) => {
        result.map((element) => {
          res.push(element)
        })
        if (i === filesPath.length - 1) {
          console.log({ res: res })
          return res
        }
      })
    }
  }
}

module.export = {
  AllPaths,
  getJson,
}
