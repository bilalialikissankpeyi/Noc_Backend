const path = require('path')
const ftp = require('basic-ftp')

var downloadRemoteFiles = async (remoteLocation) => {
  //console.log(remoteLocation)
  var client = new ftp.Client()
  client.ftp.verbose = false
  try {
    await client.access({
      host: 'localhost',
      port: '21',
      username: 'NocUser',
      password: 'NocUser',
    })
    // console.log(await client.list())
    //console.log('this is the path')
    await client.downloadTo(path.basename(remoteLocation), remoteLocation, 0)
  } catch (err) {
    console.log('this is the path')
    //console.log(err)
  }
  client.close()
}

var executeMe = (remoteLocation) => {
  downloadRemoteFiles(remoteLocation)
}

module.exports = { executeMe, downloadRemoteFiles }
