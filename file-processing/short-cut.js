var file_download = require('./file-download')
var file_path_creation = require('./Path-creation')
var file_extracting = require('./file-extracting')
var build_json_file = require('./build-json-file')
var send_minutes_files = require('../db-operations/send-minutes-files')
var send_hours_files = require('../db-operations/send-hours-files')

var send_days_files = require('../db-operations/send-days-files')
var admin_olt = require('../OLT_ONT/admin')

var minuteShortcut = async (element) => {
  console.log('sendToDB1')
  var value
  value = file_path_creation.createMinutePath(element.ObjectName)

  await file_download.downloadFile(value.path)
  console.log('sendToDB3')
  var root
  root = await file_extracting.extracting(value.path, 1)
  //console.log('sendToDB4', root)
  root.map((path, index) => {
    build_json_file.buildJsonObject(value.time, path).then((result) => {
      console.log('sendToDB', index)
      send_minutes_files.send(result, index)
      console.log('sendToDB')
    })
  })
}

var hourShortcut = async (element) => {
  var value
  value = file_path_creation.createHourPath(element.ObjectName)
  await file_download.downloadFile(value.path)
  var root
  root = await file_extracting.extracting(value.path, 2)
  root.map((path, index) => {
    build_json_file.buildJsonObject(value.time, path).then((result) => {
      send_hours_files.send(result, index)
      console.log('sendToDB')
    })
  })
}

var dayShortcut = async (element) => {
  var value
  value = file_path_creation.createDailyPath(element.ObjectName)
  await file_download.downloadFile(value.path)
  var root
  root = await file_extracting.extracting(value.path, 3)
  root.map((path, index) => {
    build_json_file.buildJsonObject(value.time, path).then((result) => {
      send_days_files.send(result, index)
      console.log('sendToDB')
    })
  })
}
module.exports = { minuteShortcut, hourShortcut, dayShortcut }
