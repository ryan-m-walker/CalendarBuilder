import calendarFactory from './calendarFactory';


const textCalendar = (date, options) => {
  const calendar = calendarFactory(date, options);

  const headingOffset = Math.ceil((21 - ((calendar.month.length + ('' + calendar.year).length) + 1)) / 2);
  let month = new Array(headingOffset).join(' ') + calendar.month + ' ' + calendar.year;
 
  let week = '';
  calendar.week.forEach((day) => {
    const str = day.substring(0,2);
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


export default textCalendar;
