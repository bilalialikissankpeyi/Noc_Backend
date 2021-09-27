const index3 = require('../index3.js')

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

var extracting = async (path, index) => {
  var csvFilePath
  if (index === 1) {
    csvFilePath = minutesCsvFilePath
  } else if (index === 2) {
    csvFilePath = hoursCsvFilePath
  } else if (index === 3) {
    csvFilePath = daysCsvFilePath
  }
  return new Promise(async (resolve, reject) => {
    var root = await index3.decompressFile(path, csvFilePath)
    resolve(root)
  })
}

module.exports = { extracting }
