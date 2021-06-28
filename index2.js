var Transform = require('stream').Transform
var util = require('util')

// Transform sctreamer to remove first line
function RemoveFirstLine(args) {
  if (!(this instanceof RemoveFirstLine)) {
    return new RemoveFirstLine(args)
  }
  Transform.call(this, args)
  this._buff = ''
  this._removed = false
}
util.inherits(RemoveFirstLine, Transform)

RemoveFirstLine.prototype._transform = function (chunk, encoding, done) {
  if (this._removed) {
    // if already removed
    this.push(chunk) // just push through buffer
  } else {
    // collect string into buffer
    this._buff += chunk.toString()

    // check if string has newline symbol
    if (this._buff.indexOf('\n') !== -1) {
      // push to stream skipping first line
      this.push(this._buff.slice(this._buff.indexOf('\r') + 1))
      // clear string buffer
      this._buff = null
      // mark as removed
      this._removed = true
    }
  }
  done()
}

var fs = require('fs')

var input = fs.createReadStream('iSAM_ontVeipPort.txt') // read file
var output = fs.createWriteStream('copy.txt') // write file

input // take input
  .pipe(RemoveFirstLine()) // pipe through line remover
  .pipe(output) //

/*const ftp = require('basic-ftp')

example()

async function example() {
  const client = new ftp.Client()
  client.ftp.verbose = true
  try {
    await client.access({
      host: 'localhost',
      port: '21',
      username: 'NocUser',
      password: 'NocUser',
    })
    console.log(await client.list())
  } catch (err) {
    console.log(err)
  }
  client.close()
}
*/
//ADIDO1_H-15M_2021-04-29-16-45.tar.gz
/*
.then((data) => {
        console.log('it is working perfectly ...')
        console.log(data, 'the data info')
        return client.list('I:/SFTP/FTTH_ADSL')
      })
      .then((data) => {
        console.log('it is working perfectly ...')
        console.log(data, 'the data info')
      })
      .catch((err) => {
        console.log(err, 'catch error')
      })****
let Client = require('ssh2-sftp-client')
let sftp = new Client()

const config = {
  host: 'localhost',
  port: '21',
  username: 'NocUser',
  password: 'NocUser',
}
sftp
  .connect(config)
  .then(() => {
    console.log('it is working perfectly ...')
    return sftp.list('I:/SFTP/FTTH_ADSL')
  })
  .then((data) => {
    console.log('it is working perfectly ...')
    console.log(data, 'the data info')
  })
  .catch((err) => {
    console.log(err, 'catch error')
  })
*/
const csvFilePath = 'iSAM_ontVeipPort.txt'

const csv = require('csvtojson')
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj)
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     **/
  })
