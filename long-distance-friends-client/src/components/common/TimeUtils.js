const _ = require("lodash");
const { DateTime, Duration } = require("luxon");

const convertDateRangeToUtc = (dates, userIana) => {
  const startDate = dates.startDate;
  const endDate = dates.endDate;

  const utcStartDate = DateTime.fromISO(startDate, { zone: userIana }).toISO();
  // Spring forward end date to include last date
  const utcEndDate = DateTime.fromISO(endDate, { zone: userIana }).plus({ days: 1 }).toISO();

  const utcRange = {
    startDate: utcStartDate,
    endDate: utcEndDate
  };

  return utcRange;
};

const convertUtcToDateRange = (dates, userIana) => {
  const userStartDate = DateTime.fromISO(dates.startDate).setZone(userIana).toFormat("yyyy-MM-dd");
  const userEndDate = DateTime.fromISO(dates.endDate).setZone(userIana).toFormat("yyyy-MM-dd");

  const dateRange = {
    startDate: userStartDate,
    endDate: userEndDate
  };
  return dateRange;
};

const convertUtcToDateTimeObj = (datetimeArray, userIana) => {
  const splitDateTime = datetimeArray.map(item => {
    let splitArray = DateTime.fromISO(item).setZone(userIana).toFormat("yyyy-MM-dd hh:mm").split(" ");
    let splitObject = {
      date: splitArray[0],
      time: splitArray[1]
    };
    return splitObject;
  });

  // Group slots by date using object with date and array of time chosen
  let groupedDateTime = _.mapValues(_.groupBy(splitDateTime, "date"), list => list.map(item => item.time));
  
  return groupedDateTime;
};

const convertDateTimeObjToUtc = (obj, userIana) => {
  let timesList = obj.time;
  let utcDateTime = timesList.map(time => {
    let datetime = obj.date + "T" + time;
    return DateTime.fromISO(datetime, { zone: userIana }).toISO();
  });
  console.log(utcDateTime);
  return utcDateTime;
};

const createTimeIntevals = (startTime, endTime, inteval) => {
  const dtStart = DateTime.fromFormat(startTime, "HH:mm");
  const dtEnd = DateTime.fromFormat(endTime, "HH:mm");
  const durationInterval = Duration.fromISOTime(inteval);

  let intevalList = [];
  let iterableTime = dtStart;
  while (iterableTime < dtEnd) {
    intevalList.push(iterableTime.toFormat("HH:mm"));
    iterableTime = iterableTime.plus(durationInterval);
  }
  return intevalList;
};

module.exports = {
  convertDateRangeToUtc,
  convertUtcToDateRange,
  createTimeIntevals,
  convertDateTimeObjToUtc,
  convertUtcToDateTimeObj
};