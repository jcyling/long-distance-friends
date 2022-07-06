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

const convertDateTimeObjToUtc = (obj, userIana) => {
  let timesList = obj.time;
  let utcDateTime = timesList.map(time => {
    let datetime = obj.date + "T" + time;
    return DateTime.fromISO(datetime, { zone: userIana }).toISO();
  });
  console.log(utcDateTime);
  return utcDateTime;
};

const convertUtcToDateRange = (dates, userIana) => {
  const startDate = DateTime.fromISO(dates.startDate, { zone: userIana });
  const endDate = DateTime.fromISO(dates.endDate, { zone: userIana });

  const userStartDate = startDate.toFormat("yyyy-MM-dd");
  const userEndDate = endDate.toFormat("yyyy-MM-dd");

  const dateRange = {
    startDate: userStartDate,
    endDate: userEndDate
  };
  return dateRange;
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
  convertDateTimeObjToUtc
};