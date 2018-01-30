const C = require('./constants');
const H = require('./helpers');

class Calendar {
  constructor(options = {}) {
    this.week = [];
    this.createCustom(options);
  }

  createCustom = (options) => {
    const dateOptions = [];
    if (options.year)  {
      dateOptions.push(options.year);
    } else {
      dateOptions.push(new Date().getFullYear());
    };

    if (options.month) {
      // Check if given month is a string (either Full or Abbreviated)
      if (typeof options.month === 'string') {
        const month = options.month.toLowerCase();
        if (C.FULL_MONTHS.indexOf(month) !== -1) {
          const monthIndex = C.FULL_MONTHS.indexOf(month)
          dateOptions.push(monthIndex);
        } else if (C.ABRV_MONTHS.indexOf(month) !== -1) {
          const monthIndex = C.ABRV_MONTHS.indexOf(month);
          dateOptions.push(monthIndex);
        } else {
          // If is string but invalid throw error
          throw new Error(options.month + ' is not a valid month');
        }
      // If month is number push number to options
      } else {
        dateOptions.push(options.month);
      }
    } else {
      dateOptions.push(new Date().getMonth());
    }

    if (options.date) {
      dateOptions.push(options.date);
    } else {
      dateOptions.push(new Date().getDate());
    }

    this._date = new Date(...dateOptions);
    this._firstOfMonth = this.getFirstOfMonth(this._date);
    this.month = H.getMonthStr(this._date);
    this.year = this._date.getFullYear();

    this.startOfWeek(options.startOfWeek);
  }

  getFirstOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  startOfWeek = (firstOfWeek) => {
    this.week = [];
    if (firstOfWeek) {
      let index = C.DAYS_OF_WEEK.indexOf(firstOfWeek.toLowerCase());
      for (let i = 0; i < 7; i++) {
        this.week.push(C.DAYS_OF_WEEK[index]);
        index++
        if (index === 7) index = 0;
      }
    } else {
      this.week = C.DAYS_OF_WEEK;
    }
  }
}


const myCalendar = new Calendar();
myCalendar.startOfWeek('Thursday');
// console.log('today', myCalendar._date);
// console.log('first of month', myCalendar._firstOfMonth);
// console.log('month', myCalendar.month);
console.log('week', myCalendar.week);





monthDate = {
  month: 'January',
  year: 2018,
  week: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  calander: [
    [-1, -1, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, -1, -1]
  ]
}

