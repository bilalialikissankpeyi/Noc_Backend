var file_download = require('./file-download')
var file_path_creation = require('./Path-creation')
var file_extracting = require('./file-extracting')
var build_json_file = require('./build-json-file')
var send_minutes_files = require('../db-operations/send-minutes-files')
var send_hours_files = require('../db-operations/send-hours-files')
var findInDb = require('../db-operations/findInDb')
var send_days_files = require('../db-operations/send-days-files')
var admin_olt = require('../OLT_ONT/admin')
const fs = require('fs')
const DF = require('data-forge')
var data = require('../models/data')
const sendToDb = require('../db-operations/sendToDb')

const manipulatedata = (path, time, objectName, index) => {
  return new Promise((resolve, reject) => {
    const text = fs.readFileSync(path, 'utf-8')
    var csvdata = DF.fromCSV(text)

    var renamed = csvdata.renameSeries(data.data[index])

    var modified = renamed.generateSeries({
      timestamp: (row) => time,
      olt: (row) => objectName,
    })
    //console.log('New csvfile', modified.toArray()[0])
    resolve(modified.toArray())
  })
}

interfaceType = (element) => {
  if (element.includes('SERV1')) {
    //push data as  SERV1 interface data
    return true
  } else if (element.includes('C14.P1')) {
    //push data as  C14.P1 interface data
    return false
  }
}

///transform vlan

transformVlan = (trans, element) => {
  var valncheck = trans.ObjectID.split('@')[0]
  var md_vlancheck = valncheck.split('.')[1]
  trans = { ...trans, vlan: md_vlancheck }
  if (interfaceType(trans.ObjectID)) {
    trans = {
      ...trans,
      type: 'SERV1',
    }
  } else {
    trans = {
      ...trans,
      type: 'C14.P1',
    }
  }
  var removed = trans.ObjectID.split('@')[1]
  var mdremoved = removed
    .replace(removed.split('.')[6], '')
    .replace(removed.split('.')[5], '')
    .replace('..', '')
  trans = {
    ...trans,
    ObjectName: element.ObjectName + ':' + mdremoved,
  }
  return trans
}

var minuteShortcut = (element) => {
  console.log('sendToDB1')
  var value
  value = file_path_creation.createMinutePath(element.ObjectName)
  console.log('returnedValue', value)
  file_download.downloadFile(value.path).then(() => {
    file_extracting.extracting(value.path, 1).then((root) => {
      //supression du fichier compresser
      fs.unlink(value.path, (err) => {})
      ///get alluser information
      findInDb
        .findRelatedONT('mydb', 'ONT_INFO', element.ObjectName)
        .then((onts) => {
          //loop over array of paths to contained files
          root.map((path, index) => {
            //manilpulate the set to add some values (time,and the OLT)
            manipulatedata(path, value.time, element.ObjectName, index).then(
              (transformed) => {
                if (transformed.length !== 0) {
                  //loop over the related onts of the element.ObjectName and build documents to be send to the db
                  var data_todb = []
                  transformed.map((trans) => {
                    switch (index) {
                      case 0:
                        if (interfaceType(trans.ObjectID)) {
                          var removed = trans.ObjectID.replace('.SERV1', '')
                          trans = {
                            ...trans,
                            type: 'SERV1',
                            ObjectName: element.ObjectName + ':' + removed,
                          }
                        } else {
                          var removed = trans.ObjectID.replace('.C14.P1', '')
                          trans = {
                            ...trans,
                            type: 'C14.P1',
                            ObjectName: element.ObjectName + ':' + removed,
                          }
                        }
                        break
                      case 1:
                        trans = {
                          ...trans,
                          ObjectName: element.ObjectName + ':' + trans.ObjectID,
                        }
                        break
                      case 2:
                        trans = transformVlan(trans, element)
                        break
                    }
                    data_todb.push(trans)
                  })
                  send_minutes_files.addTotheCollection(data_todb, index)
                }
                //supression du fichier unitaire
                fs.unlink(path, (err) => {})
              }
            )
          })
        })
    })
  })
}

//
checkifcontains = (element, contained) => {
  var contain = false
  if (element.includes(contained.split(':')[1])) {
    contain = true
  }
  return contain
}

// Return new transformed object  depending on the type of port (veipPort== Voice over IP)
transformVeipPort = (trans, element) => {
  if (trans.ObjectID.slice(-1) === '1') {
    var type = trans.ObjectID.split('.')[5] + trans.ObjectID.split('.')[6]
    trans = { ...trans, type: type }
  } else {
    var type = trans.ObjectID.split('.')[5] + trans.ObjectID.split('.')[6]
    trans = { ...trans, type: type }
  }
  var removed = trans.ObjectID.replace(trans.ObjectID.split('.')[6], '')
    .replace(trans.ObjectID.split('.')[5], '')
    .replace('..', '')
  id = element.ObjectName + ':' + removed
  trans = {
    ...trans,
    ObjectName: id,
  }
  return trans
}

add_attrib = (trans, element) => {
  var id = element.ObjectName + ':' + trans.ObjectID
  trans = { ...trans, ObjectID: id, ObjectName: id }
  return trans
}

var hourShortcut = (element) => {
  var value
  value = file_path_creation.createHourPath(element.ObjectName)
  file_download.downloadFile(value.path).then(() => {
    file_extracting.extracting(value.path, 2).then((root) => {
      //supression du fichier compresser
      fs.unlink(value.path, (err) => {})
      ///Add User to ONT-DN
      const ont = fs.readFileSync(root[3], 'utf-8')
      const ethOnt = fs.readFileSync(root[4], 'utf-8')
      var csvdata = DF.fromCSV(ont)
      var csv2data = DF.fromCSV(ethOnt)

      root.map((path, index) => {
        newindex = index + 3
        manipulatedata(path, value.time, element.ObjectName, newindex).then(
          (transformed) => {
            if (transformed.length !== 0) {
              var data_todb = []
              transformed.map((trans) => {
                switch (index) {
                  case 0:
                    trans = add_attrib(trans, element)
                    break
                  case 1:
                    trans = add_attrib(trans, element)
                    break
                  case 2:
                    trans = add_attrib(trans, element)
                    break
                  case 3:
                    delete trans['Equipment ID']
                    delete trans['Serial Number']
                    delete trans['Suscriber ID1']
                    delete trans['Suscriber Location ID']
                    trans = {
                      ...trans,
                      ObjectName: (id =
                        element.ObjectName + ':' + trans.ObjectID),
                    }
                    break
                  case 4:
                    delete trans['Ext Customer ID']
                    var type = 'C1.P' + trans.ObjectID.slice(-1)
                    var removed = trans.ObjectID.replace(
                      trans.ObjectID.split('.')[6],
                      ''
                    )
                      .replace(trans.ObjectID.split('.')[5], '')
                      .replace('..', '')
                    id = element.ObjectName + ':' + removed
                    trans = {
                      ...trans,
                      type: type,
                      ObjectName: id,
                    }
                    break
                  case 5:
                    //veip
                    trans = transformVeipPort(trans, element)
                    break
                  case 6:
                    trans = add_attrib(trans, element)
                    break
                  case 7:
                    //uni
                    trans = transformVeipPort(trans, element)
                    break
                  case 8:
                    trans = transformVlan(trans, element)
                    break
                  default:
                }
                data_todb.push(trans)
              })
              send_hours_files.addTotheCollection(data_todb, index)
            }
          }
        )
        fs.unlink(path, (err) => {})
      })
      ////End
      /*findInDb
        .findRelatedONT('mydb', 'ONT_INFO', element.ObjectName)
        .then((onts) => {
          /* if (csvdata.toArray().length > onts.length) {
            sendToDb.addUserToDb(csvdata.toArray(), csv2data.toArray(), onts)
          }
        })*/
    })
  })
}
var dayShortcut = (element) => {
  var value
  value = file_path_creation.createDailyPath(element.ObjectName)
  file_download.downloadFile(value.path).then(() => {
    file_extracting.extracting(value.path, 3).then((root) => {
      //supression du fichier compresser
      fs.unlink(value.path, (err) => {})
      root.map((path, index) => {
        manipulatedata(path, value.time, element.ObjectName, index + 12).then(
          (transformed) => {
            if (transformed.length !== 0) {
              //loop over the related onts of the element.ObjectName and build documents to be send to the db
              var data_todb = []
              transformed.map((trans) => {
                trans = transformVlan(trans, element.ObjectName)
                data_todb.push(trans)
              })
              send_days_files.addTotheCollection(data_todb, index)
            }
            //supression du fichier unitaire
            fs.unlink(path, (err) => {})
          }
        )
      })
    })
  })
}
module.exports = { minuteShortcut, hourShortcut, dayShortcut }
/*
                
              }
            )
          })
          
        })
    })
  })
}
*/
