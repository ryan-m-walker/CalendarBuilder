import calenderFactory from './calendarFactory';
import textCalendar from './textCalendar';
import htmlCalendar from './htmlCalendar';


const calenderBuilder = {
  data: calenderFactory,
  text: textCalendar,
  html: htmlCalendar,
};


export default calenderBuilder;
