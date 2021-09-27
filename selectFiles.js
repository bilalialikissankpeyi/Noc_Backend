var pathForMinutes = []
var pathForHours = []
var pathForDays = []
var pathForMonth = []

var setOtherPath = (selection) => {
  if (
    selection.getHours() !== pathForHours[pathForHours.length - 1].getHours()
  ) {
    pathForHours.push(new Date(selection))
  }
  if (selection.getDate() !== pathForDays[pathForDays.length - 1].getDate()) {
    pathForDays.push(new Date(selection))
  }
  if (
    selection.getMonth() !== pathForMonth[pathForMonth.length - 1].getMonth()
  ) {
    pathForMonth.push(new Date(selection))
  }
}

var createPath = (timeSelected, userOLT) => {
  pathForHours.push(new Date(timeSelected[0]))
  pathForDays.push(new Date(timeSelected[0]))
  pathForMonth.push(new Date(timeSelected[0]))
  timeSelected.map((selection) => {
    console.log({ time: selection })
    pathForMinutes.push({
      time: selection,
      path:
        userOLT +
        'H-15M_15M_' +
        selection.getFullYear() +
        '-' +
        selection.getMonth() +
        '-' +
        selection.getDate() +
        '-' +
        selection.getHours() +
        '-' +
        selection.getMinutes() +
        '.tar.gz',
    })
    setOtherPath(selection)
  })
  pathForHours.map((selection, i) => {
    pathForHours[i] = {
      time: selection,
      path:
        userOLT +
        'I-1H_' +
        selection.getFullYear() +
        '-' +
        selection.getMonth() +
        '-' +
        selection.getDate() +
        '-' +
        selection.getHours() +
        '.tar.gz',
    }
  })
  pathForDays.map((selection, i) => {
    pathForDays[i] = {
      time: selection,
      path:
        userOLT +
        'H-24H_' +
        selection.getFullYear() +
        '-' +
        selection.getMonth() +
        '-' +
        selection.getDate() +
        '.tar.gz',
    }
  })
  pathForMonth.map((selection, i) => {
    pathForMonth[i] = {
      time: selection,
      path:
        userOLT +
        'H-1M_' +
        selection.getFullYear() +
        '-' +
        selection.getMonth() +
        '.tar.gz',
    }
  })

  return {
    month: pathForMonth,
    days: pathForDays,
    hours: pathForHours,
    minutes: pathForMinutes,
  }
}

var minuteDifference = (startTime, endTime) => {
  // console.log((endTime - startTime) / 1000 / 60)
  return (endTime - startTime) / 1000 / 60
}

var getPath = (timeSelection) => {
  var startTime = new Date(timeSelection.startTime)

  var endTime = new Date(timeSelection.endTime)
  /*console.log(timeSelection.startTime.getTime())
  console.log(timeSelection.endTime.getTime())*/

  var toBeSelected = []

  while (minuteDifference(startTime.getTime(), endTime.getTime()) >= 15) {
    //console.log('loop start')
    if (
      startTime.getMinutes() >= 45 &&
      minuteDifference(startTime.getTime(), endTime.getTime()) >= 15
    ) {
      //console.log('entered 45')
      startTime.setHours(startTime.getHours() + 1)
      startTime.setMinutes(0)
      //console.log('after 45')
      toBeSelected.push(new Date(startTime))
    } else if (checkTimeCondition(startTime, endTime, 30, 45)) {
      //console.log('entered 30-45')
      startTime.setMinutes(45)
      //console.log('after 30-45' + startTime)
      toBeSelected.push(new Date(startTime))
    } else if (checkTimeCondition(startTime, endTime, 15, 30)) {
      //console.log('entered 15-30')
      startTime.setMinutes(30)
      //console.log('after 15-30' + startTime)
      toBeSelected.push(new Date(startTime))
    } else if (checkTimeCondition(startTime, endTime, 0, 15)) {
      //console.log('entered 0-15')
      startTime.setMinutes(15)
      //console.log('after 0-15' + startTime)
      toBeSelected.push(new Date(startTime))
    } else if (
      startTime.getMinutes() === 0 &&
      minuteDifference(startTime.getTime(), endTime.getTime()) >= 15
    ) {
      //console.log('entered 0')

      startTime.setMinutes(15)
      toBeSelected.push(new Date(startTime))
      ///console.log('after 0' + startTime)
    } else if (
      startTime.getMinutes() === 15 &&
      minuteDifference(startTime.getTime(), endTime.getTime()) >= 15
    ) {
      //console.log('entered 15')

      startTime.setMinutes(30)
      toBeSelected.push(new Date(startTime))
      //console.log('after 15' + startTime)
    } else if (
      startTime.getMinutes() === 30 &&
      minuteDifference(startTime.getTime(), endTime.getTime()) >= 15
    ) {
      //console.log('entered 45')
      startTime.setMinutes(45)
      toBeSelected.push(new Date(startTime))
      //console.log('after 45' + startTime)
    }
    //console.log('loop end')
  }
  return toBeSelected
}

var checkTimeCondition = (startTime, endTime, gapStart, gapEnd) => {
  if (
    startTime.getMinutes() > gapStart &&
    startTime.getMinutes() < gapEnd &&
    minuteDifference(startTime.getTime(), endTime.getTime()) >= 15
  ) {
    return true
  }
  return false
}

module.exports = {
  createPath,
  getPath,
  setOtherPath,
  minuteDifference,
  checkTimeCondition,
}
