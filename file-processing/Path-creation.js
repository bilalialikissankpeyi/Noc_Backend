var addZero = (value) => {
  var toconsider = value
  if (value < 10) {
    var toconsider = '0' + `${value}`
  }
  return toconsider
}
var createMinutePath = (OltID) => {
  const lastfifteen = new Date()
  console.log('lastfif before', lastfifteen.getUTCMonth())
  console.log('utc month', lastfifteen.getUTCMonth())
  lastfifteen.setMinutes(lastfifteen.getMinutes() - 1)
  const time = new Date(lastfifteen)
  time.setMonth(time.getMonth())
  console.log('lastfif after', time)
  console.log('toiso', new Date(lastfifteen.toISOString()))
  return {
    path:
      OltID +
      '_H-15M_15M_' +
      addZero(lastfifteen.getFullYear()) +
      '-' +
      addZero(lastfifteen.getMonth() + 1) +
      '-' +
      addZero(lastfifteen.getDate()) +
      '-' +
      addZero(lastfifteen.getHours()) +
      '-' +
      addZero(lastfifteen.getMinutes()) +
      '.tar.gz',
    time: time,
  }
}

var createHourPath = (OltID) => {
  const lastHour = new Date()
  console.log('utc month', lastHour.getUTCMonth())
  console.log('utc year', lastHour.getUTCFullYear())
  console.log('utc date', lastHour.getUTCDate())
  console.log('utc minute', lastHour.getUTCMinutes())
  lastHour.setMinutes(lastHour.getMinutes() - 1)
  const time = new Date(lastHour)
  time.setMonth(time.getMonth())
  return {
    path:
      OltID +
      '_I-1H_' +
      addZero(lastHour.getFullYear()) +
      '-' +
      addZero(lastHour.getMonth() + 1) +
      '-' +
      addZero(lastHour.getDate()) +
      '-' +
      addZero(lastHour.getHours()) +
      '.tar.gz',
    time: time,
  }
}

var createDailyPath = (OltID) => {
  const lastDay = new Date()
  console.log('utc month', lastDay.getUTCMonth())
  lastDay.setDate(lastDay.getDate())
  lastDay.setMinutes(lastDay.getMinutes() - 1)
  const time = new Date(lastDay)
  time.setMonth(time.getMonth())
  return {
    path:
      OltID +
      'H-24H_' +
      addZero(lastDay.getFullYear()) +
      '-' +
      addZero(lastDay.getMonth() + 1) +
      '-' +
      addZero(lastDay.getDate()) +
      '.tar.gz',
    time: time,
  }
}

module.exports = { createMinutePath, createHourPath, createDailyPath }
