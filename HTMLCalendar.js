const fs = require('fs');
const calendarFactory = require('./calendarFactory');


const HTMLCalendar = (date, options) => {
  const calendar = calendarFactory(date, options);
  
  const header = 
    '<table border="0" cellpadding="0" cellspacing="0" class="month">\n' +
    '  <tr>\n' +
    '    <th colspan="7" class="month">' + calendar.month + ' ' + calendar.year + '</th>\n' +
    '  </tr>\n'
  ;

  let week =  '  <tr>\n';
  calendar.week.forEach((weekDay) => {
    week += '    <th class="' + weekDay.substring(0, 3).toLowerCase() + '">' + weekDay.substring(0, 3) + '</th>\n';
  });
  week += '  </tr>\n';

  let body = '';
  calendar.calendar.forEach((row) => {
    let rowHtml = '  <tr>\n';
    row.forEach((date) => {
      rowHtml += '    <td class="' + (date.date ? date.day.substring(0, 3).toLowerCase() : 'noday') + '">' + (date.date ? date.date : '&nbsp;') + '</td>\n';
    });
    rowHtml += '  </tr>\n';
    body += rowHtml;
  });


  const footer = '</table>\n'

  return header + week + body + footer;
};


const res = HTMLCalendar(new Date(2020, 5));
console.log(res);

fs.writeFile('test.html', res, (err) => {
  if (err) console.log(err);
});