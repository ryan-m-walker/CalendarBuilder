const C = require('./constants');
const H = require('./helpers');


const calendarFactory = (date, options) => {
  options = {
    startDay: 'sunday',
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

    while (counter <= monthLength) {
      let weekArr = [];
      for (let i = 0; i < 7; i++) {
        let weekday = week[i + 1];
        if ((weekday !== firstOfMonthStr) && !counter) {
          weekArr.push(0);
        } else if (counter > monthLength) {
          weekArr.push(0);
        } else {
          weekArr.push(counter);
          counter++;
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
      if (day === 0) {
        calendarStr += '  ';
      } else if (day < 10) {
        calendarStr += ' ' + day;
      } else {
        calendarStr += day;
      }
      calendarStr += ' '
    });
    calendarStr += '\n';
  });

  const fullStr = month + '\n' + week + '\n' + calendarStr;
  return fullStr;
};



const myCalendar = textCalendar(new Date(), { startDay: 'wednesday' });
console.log(myCalendar);



// We Th Fr Sa Su Mo Tu





// switch (day) {
//   case (day === 0):
//     calendarStr += '  ';
//     break;
//   case (day < 10):
//     calendarStr += ' ' + day;
//     break;
//   default:
//     console.log(day < 10)
//     // calendarStr += day;
// }