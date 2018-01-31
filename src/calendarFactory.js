import * as C from './constants';
import * as H from './helpers';


const calendarFactory = (date = new Date(), options) => {

  if (date._isAMomentObject) {
    date = date.toDate();
  }

  if (options && options.startDay) {
    options.startDay = H.capitalizeFirstLetter(options.startDay);
  };

  options = {
    startDay: 'Sunday',
    pickedDay: undefined,
    today: undefined,
    ...options
  };

  const buildWeek = () => {
    const week = [];
    let index = C.DAYS_OF_WEEK.indexOf(options.startDay);
    for (let i = 0; i < 7; i++) {
      week.push(C.DAYS_OF_WEEK[index]);
      index++;
      if (index === 7) index = 0;
    }
    return week;
  };

  const buildCalendar = () => {
    let counter = 0;
    const calendarArr = [];

    while (counter <= monthLength - 1) {
      let weekArr = [];
      for (let i = 0; i < 7; i++) {
        let weekday = week[i];
        if ((weekday !== firstOfMonthStr) && !counter) {
          weekArr.push({
            date: 0,
            day: weekday
          });
        } else if (counter > monthLength - 1) {
          weekArr.push({
            date: 0,
            day: weekday,
            dayAbrv: weekday.substring(0,3),
            dayLetter: weekday.substring(0,1)
          });
        } else {
          counter++;
          weekArr.push({
            date: counter,
            day: weekday,
            dayAbrv: weekday.substring(0,3),
            dayLetter: weekday.substring(0,1)
          });

        }
      }
      calendarArr.push(weekArr);
    }
    return calendarArr;
  };

  const month = H.getMonthStr(date);
  const monthIndex = date.getMonth();
  const monthAbrv = C.ABRV_MONTHS[monthIndex];
  const monthLength = H.getMonthLength(month);
  const week = buildWeek();
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstOfMonthStr = C.DAYS_OF_WEEK[firstOfMonth.getDay()];
  const calendar = buildCalendar();

  const dataObj = {
    month,
    monthIndex,
    monthAbrv,
    monthLength,
    numberOfWeeks: calendar.length,
    firstOfMonthStr: firstOfMonthStr,
    year: date.getFullYear(),
    week,
    weekAbrv: week.map((day) => day.substring(0,2)),
    weekLetter: week.map((day) => day.substring(0,1)),
    calendar,
  };

  return dataObj;
};


export default calendarFactory;

