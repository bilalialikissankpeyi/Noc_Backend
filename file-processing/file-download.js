const remoteAccess = require('../remoteAccess.js')

var remoteRootFd = 'FTTH_ADSL/'

var downloadFile = async (path) => {
  var fullPath = remoteRootFd + path
  console.log(fullPath)
  await remoteAccess.downloadRemoteFiles(fullPath)
  console.log('sendToDB2')
}

module.exports = { downloadFile }
//node --trace-warnings
