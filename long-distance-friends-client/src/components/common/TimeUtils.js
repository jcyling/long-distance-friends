const { DateTime } = require("luxon");

const convertDateRangeToUtc = (dates, userIana) => {
  const startDate = dates.startDate;
  const endDate = dates.endDate;
  
  const utcStartDate = DateTime.fromISO(startDate, {zone: userIana}).toISO();
  // Spring forward end date to include last date
  const utcEndDate = DateTime.fromISO(endDate, {zone: userIana}).plus({ days: 1 }).toISO();

  const utcRange = {
    startDate: utcStartDate,
    endDate: utcEndDate
  };

  return utcRange;
};

const convertUtcToDateRange = (dates, userIana) => {
  // Convert utc dates to local dates
  // Return datetime with local timezone
};

const convertIanaToOffset = (userIana) => {
  // Convert Iana to offset from utc
  // Return iana
}

module.exports = {
  convertDateRangeToUtc,
  convertUtcToDateRange,
  convertIanaToOffset
};