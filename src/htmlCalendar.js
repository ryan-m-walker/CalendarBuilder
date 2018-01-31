import calendarFactory from './calendarFactory';


const htmlCalendar = (date, options) => {
  const calendar = calendarFactory(date, options);
  
  const header = 
    '<table border="0" cellpadding="0" cellspacing="0" class="month">\n' +
    '  <thead>\n' +
    '    <tr>\n' +
    '      <th colspan="7" class="month">' + calendar.month + ' ' + calendar.year + '</th>\n' +
    '    </tr>\n'
  ;

  let week =  '    <tr>\n';
  calendar.week.forEach((weekDay) => {
    week += '      <th class="' + weekDay.substring(0, 3).toLowerCase() + '">' + weekDay.substring(0, 3) + '</th>\n';
  });
  week += '    </tr>\n  </thead>\n';

  let body = '  <tbody>\n';
  calendar.calendar.forEach((row) => {
    let rowHtml = '    <tr>\n';
    row.forEach((date) => {
      rowHtml += '      <td class="' + (date.date ? date.day.substring(0, 3).toLowerCase() : 'noday') + '">' + (date.date ? date.date : '&nbsp;') + '</td>\n';
    });
    rowHtml += '    </tr>\n';
    body += rowHtml;
  });
  body += '  </tbody>\n'

  const footer = '</table>\n'

  return header + week + body + footer;
};


export default htmlCalendar;
