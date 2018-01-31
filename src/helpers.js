import { FULL_MONTHS, MONTH_LENGTHS } from './constants';


export const capitalizeFirstLetter = (str) => (
  str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase()
);

export const getMonthStr = (date) => (
  capitalizeFirstLetter(FULL_MONTHS[date.getMonth()])
);

export const getMonthLength = (month) => (
  MONTH_LENGTHS[FULL_MONTHS.indexOf(month)]
);

