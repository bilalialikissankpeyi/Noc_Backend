hive = require('node-hive').for({
  server: '192.168.199.130',
})

console.log(hive)
var getdata = () => {
  hive.fetch('select * from demo1;', async function (err, data) {
    console.log(data)
    data.each(function (record) {
      console.log(record)
    })
  })
  /*hive.execute('SELECT * FROM demo1', function (err, data) {
    console.log(data)
    data.each(function (record) {
      console.log(record)
    })
  })*/
}
getdata()
/*const hive = require('hive-driver')
const { TCLIService, TCLIService_types } = hive.thrift
const client = new hive.HiveClient(TCLIService, TCLIService_types)

client
  .connect(
    {
      host: '192.168.1.91',
      port: 10000,
    },
    new hive.connections.TcpConnection(),
    new hive.auth.NoSaslAuthentication()
  )
  .then(async (client) => {
    const session = await client.openSession({
      client_protocol:
        TCLIService_types.TProtocolVersion.HIVE_CLI_SERVICE_PROTOCOL_V10,
    })
    const response = await session.getInfo(
      TCLIService_types.TGetInfoType.CLI_DBMS_VER
    )

    console.log(response.getValue())

    await session.close()
  })
  .catch((error) => {
    console.log(error)
  })
*/
/*const options = {
  // Connection configuration
  auth: 'NOSASL',
  host: '101.102.103.104',           // HiveServer2 hostname
  port: '12340',                     // HiveServer2 port
  timeout: 10000,                    // Connection timeout
  username: 'jshs2tester',           // HiveServer2 user
  password: '',                      // HiveServer2 password
  hiveType: HS2Util.HIVE_TYPE.HIVE,  // HiveServer2 type, (Hive or CDH Hive)
  hiveVer: '1.1.0',                  // HiveServer2 Version
  thriftVer: '0.9.2',                // Thrift version at IDL Compile time
 
  // maybe if you need chdVer below after line
  cdhVer: '5.3.0',
 
  // Cursor configuration
  maxRows: 5120,
  nullStr: 'NULL',
  i64ToString: true,
};
 
 
const configure = new Configuration(options);
const idl = new IDLContainer();
 
idl.initialize(configure).then(() => {
  // your code, ...
});

*/
/*var JDBC = require('jdbc')
var jinst = require('jdbc/lib/jinst')

// isJvmCreated will be true after the first java call.  When this happens, the
// options and classpath cannot be adjusted.
if (!jinst.isJvmCreated()) {
  // Add all java options required by your project here.  You get one chance to
  // setup the options before the first java call.
  jinst.addOption('-Xrs')
  // Add all jar files required by your project here.  You get one chance to
  // setup the classpath before the first java call.
  jinst.setupClasspath([
    './drivers/hsqldb.jar',
    './drivers/derby.jar',
    './drivers/derbyclient.jar',
    './drivers/derbytools.jar',
    './lib/drivers/hive-jdbc-3.1.2.jar',
    './lib/drivers/hive-exec-3.1.2.jar',
    './lib/drivers/hive-common-3.1.2.jar',
    './lib/drivers/hive-metastore-3.1.2.jar',
    './lib/drivers/hive-service-3.1.2.jar',
    './lib/drivers/httpclient-4.5.2.jar',
    './lib/drivers/httpcore-4.5.2.jar',
    './lib/drivers/libthrift-0.9.3.jar',
    './lib/drivers/libfb303-0.9.3.jar',
    './lib/drivers/hadoop-common-3.3.1.jar',
    './lib/drivers/slf4j-api-1.7.21.jar',
    './lib/drivers/org-apache-commons-logging.jar',
  ])
}

var config = {
  url: 'jdbc:hive2://192.168.1.91:10000',
  user: 'APP',
  password: 'mine',
  minpoolsize: 2,
  maxpoolsize: 3,
}

var testpool = null
var testconn = null
var hsqldb = new JDBC(config)

hsqldb.initialize(function (err) {
  if (err) {
    console.log(err)
  }
})

hsqldb.reserve(function (err, connObj) {
  console.log('Using connection: ' + connObj.uuid)
  var conn = connObj.conn
  conn.createStatement(function (err, statement) {
    statement.executeQuery(
      'select * from test1 limit 1',
      function (err, resultSet) {
        //console.log(resultSet);
        resultSet.toObjArray(function (err, results) {
          console.log(results)
        })
      }
    )
  })
})*/
/*const hbase = require('hbase')
// Instantiate a new client
client = hbase({ host: '192.168.1.91', port: 8080 })

const myScanner = new hbase.Scanner(client, { table: 'ONTAggGem' })
client.table('ONTAggGem').scan((err, rows) => console.info(rows))
// Create a table
/*client.table('users').create('my_column_family', function (err, success) {
  // Insert a record
  console.log('error', err)
  console.log('success', success)
  client
    .table('users')
    .row('my_row')
    .put('my_column_family:my_column', 'my value2', function (err, success) {
      console.log('error', err)
      console.log('success', success)
      // Read a record
      client
        .table('users')
        .row('my_row')
        .get('my_column_family:my_column', function (err, [cell]) {
          // Validate the result
          console.log(cell.key, 'my_row')
          console.log(cell.column, 'my_column_family:my_column')
          console.log(cell.$, 'my value')
        })
    })
})
/*
client
  .table('BridgePort')
  .row('R1.S1.LT4.PON3.ONT11.SERV1')
  .get('Bridgefamily', function (err, [cell]) {
    // Validate the result
    console.log(cell.key, 'my_row')
    console.log(cell.column, 'my_column_family:my_column')
    console.log(cell.$, 'my value')
  })*/
