var createMinutePath = (OltID) => {
  lastfifteen = new Date()
  console.log('sendToDB', lastfifteen)
  if (lastfifteen.getMinutes() === 1) {
    lastfifteen.setMinutes(0)
    lastfifteen.setMonth(lastfifteen.getMonth() + 1)
  } else {
    lastfifteen.setMinutes(lastfifteen.getMinutes() - 1)
    lastfifteen.setMonth(lastfifteen.getMonth() + 1)
  }
  console.log('sendToDB', lastfifteen)
  return {
    path:
      OltID +
      'H-15M_15M_' +
      lastfifteen.getFullYear() +
      '-' +
      lastfifteen.getMonth() +
      '-' +
      lastfifteen.getDate() +
      '-' +
      lastfifteen.getHours() +
      '-' +
      lastfifteen.getMinutes() +
      '.tar.gz',
    time: lastfifteen,
  }
}

var createHourPath = (OltID) => {
  lastHour = new Date()
  return {
    path:
      OltID +
      'I-1H_' +
      lastHour.getFullYear() +
      '-' +
      lastHour.getMonth() +
      '-' +
      lastHour.getDate() +
      '-' +
      lastHour.getHours() +
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
      lasDay.getFullYear() +
      '-' +
      lasDay.getMonth() +
      '-' +
      lasDay.getDate() +
      '.tar.gz',
    time: lastDay,
  }
}

module.exports = { createMinutePath, createHourPath, createDailyPath }
