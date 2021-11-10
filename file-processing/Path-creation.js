var addZero = (value) => {
  var toconsider = value
  if (value < 10) {
    var toconsider = '0' + `${value}`
  }
  return toconsider
}
var createMinutePath = (OltID) => {
  lastfifteen = new Date()
  console.log('lastfif before', lastfifteen.getMonth())
  if (lastfifteen.getMinutes() === 1) {
    lastfifteen.setMinutes(0)
    lastfifteen.setMonth(lastfifteen.getMonth() + 1)
  } else {
    lastfifteen.setMinutes(lastfifteen.getMinutes() - 1)
    lastfifteen.setMonth(lastfifteen.getMonth() + 1)
  }
  console.log('lastfif after', lastfifteen.getMonth())
  return {
    path:
      OltID +
      'H-15M_15M_' +
      addZero(lastfifteen.getFullYear()) +
      '-' +
      addZero(lastfifteen.getMonth()) +
      '-' +
      addZero(lastfifteen.getDate()) +
      '-' +
      addZero(lastfifteen.getHours()) +
      '-' +
      addZero(lastfifteen.getMinutes()) +
      '.tar.gz',
    time: lastfifteen,
  }
}

var createHourPath = (OltID) => {
  lastHour = new Date()
  return {
    path:
      OltID +
      '_I-1H_' +
      addZero(lastHour.getFullYear()) +
      '-' +
      addZero(lastHour.getMonth()) +
      '-' +
      addZero(lastHour.getDate()) +
      '-' +
      addZero(lastHour.getHours()) +
      '.tar.gz',
    time: lastHour,
  }
}

var createDailyPath = (OltID) => {
  lastDay = new Date()
  lasDay.setDate(lasDay.getDate() - 1)
  return {
    path:
      OltID +
      'H-24H_' +
      addZero(lasDay.getFullYear()) +
      '-' +
      addZero(lasDay.getMonth()) +
      '-' +
      addZero(lasDay.getDate()) +
      '.tar.gz',
    time: lastDay,
  }
}

module.exports = { createMinutePath, createHourPath, createDailyPath }
