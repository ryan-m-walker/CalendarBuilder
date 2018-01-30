const C = require('./constants');
const { FULL_MONTHS } = C;


const capitalizeFirstLetter = (str) => (
  str.substring(0, 1).toUpperCase() + str.substring(1, str.length)
);

const getMonthStr = (date) => (
  capitalizeFirstLetter(FULL_MONTHS[date.getMonth()])
);

const getMonthLength = (month) => (
  C.MONTH_LENGTHS[C.FULL_MONTHS.indexOf(month.toLowerCase())]
);


module.exports = {
  getMonthStr,
  getMonthLength,
  capitalizeFirstLetter
};
