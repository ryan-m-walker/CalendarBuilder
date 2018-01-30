const fs = require('fs');

const C = require('./constants');
const H = require('./helpers');


const calendarFactory = (date, options) => {
  options = {
    startDay: 'sunday',
    pickedDay: undefined,
    today: undefined,
    ...options
  }


  const buildWeek = () => {
    const week = [];
    let index = C.DAYS_OF_WEEK.indexOf(options.startDay.toLowerCase());
    for (let i = 0; i < 7; i++) {
      week.push(C.DAYS_OF_WEEK[index]);
      index++
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
        }
        else if ((weekday === firstOfMonthStr) && !counter) {
          counter++;
          weekArr.push({
            date: counter,
            day: weekday
          });
        } else if (counter > monthLength - 1) {
          weekArr.push({
            date: 0,
            day: weekday
          });
        } else {
          counter++;
          weekArr.push({
            date: counter,
            day: weekday
          });

        }
      }
      calendarArr.push(weekArr);
    }
    return calendarArr;
  };


  const month = H.getMonthStr(date);
  const monthLength = H.getMonthLength(month);
  const week = buildWeek();
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstOfMonthStr = C.DAYS_OF_WEEK[firstOfMonth.getDay()];
  const calendar = buildCalendar();



  const dataObj = {
    month,
    monthLength,
    numberOfWeeks: calendar.length,
    firstOfMonthStr: firstOfMonthStr,
    year: date.getFullYear(),
    week,
    calendar
  };

  return dataObj;
};



const textCalendar = (date, options) => {
  const calendar = calendarFactory(date, options);

  const headingOffset = Math.floor((21 - ((calendar.month.length + ('' + calendar.year).length) + 1)) / 2);
  let month = new Array(headingOffset).join(' ') + H.capitalizeFirstLetter(calendar.month) + ' ' + calendar.year;
 
  let week = '';
  calendar.week.forEach((day) => {
    const str = H.capitalizeFirstLetter(day.substring(0,2));
    week += str + ' ';
  });

  let calendarStr = '';
  calendar.calendar.forEach((row) => {
    row.forEach((day) => {
      if (day.date === 0) {
        calendarStr += '  ';
      } else if (day.date < 10) {
        calendarStr += ' ' + day.date;
      } else {
        calendarStr += day.date;
      }
      calendarStr += ' '
    });
    calendarStr += '\n';
  });

  const fullStr = month + '\n' + week + '\n' + calendarStr;
  return fullStr;
};



const myCalendar = calendarFactory(new Date(2950, 1), {
  pickedDay: 13
});
fs.writeFile('./data.json', JSON.stringify(myCalendar, null, 2), (err) => {
  if (err) console.log(err);
});


