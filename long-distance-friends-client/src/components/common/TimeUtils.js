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

const convertUtcToDateRange = () => {
  // Convert utc dates to local dates
  // Return datetime with local timezone
};

const convertIanaToOffset = () => {
  // Convert Iana to offset from utc
  // Return iana
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
  convertIanaToOffset,
  createTimeIntevals
};