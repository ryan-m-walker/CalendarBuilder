(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["calender-builder"] = factory();
	else
		root["calender-builder"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(1);

var C = _interopRequireWildcard(_constants);

var _helpers = __webpack_require__(3);

var H = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var calendarFactory = function calendarFactory() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var options = arguments[1];


  if (date._isAMomentObject) {
    date = date.toDate();
  }

  if (options && options.startDay) {
    options.startDay = H.capitalizeFirstLetter(options.startDay);
  };

  options = _extends({
    startDay: 'Sunday',
    pickedDay: undefined,
    today: undefined
  }, options);

  var buildWeek = function buildWeek() {
    var week = [];
    var index = C.DAYS_OF_WEEK.indexOf(options.startDay);
    for (var i = 0; i < 7; i++) {
      week.push(C.DAYS_OF_WEEK[index]);
      index++;
      if (index === 7) index = 0;
    }
    return week;
  };

  var buildCalendar = function buildCalendar() {
    var counter = 0;
    var calendarArr = [];

    while (counter <= monthLength - 1) {
      var weekArr = [];
      for (var i = 0; i < 7; i++) {
        var weekday = week[i];
        if (weekday !== firstOfMonthStr && !counter) {
          weekArr.push({
            date: 0,
            day: weekday,
            dayAbrv: weekday.substring(0, 3),
            dayLetter: weekday.substring(0, 1)
          });
        } else if (counter > monthLength - 1) {
          weekArr.push({
            date: 0,
            day: weekday,
            dayAbrv: weekday.substring(0, 3),
            dayLetter: weekday.substring(0, 1)
          });
        } else {
          counter++;
          weekArr.push({
            date: counter,
            day: weekday,
            dayAbrv: weekday.substring(0, 3),
            dayLetter: weekday.substring(0, 1)
          });
        }
      }
      calendarArr.push(weekArr);
    }
    return calendarArr;
  };

  var month = H.getMonthStr(date);
  var monthIndex = date.getMonth();
  var monthAbrv = C.ABRV_MONTHS[monthIndex];
  var monthLength = H.getMonthLength(month);
  var week = buildWeek();
  var firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  var firstOfMonthStr = C.DAYS_OF_WEEK[firstOfMonth.getDay()];
  var calendar = buildCalendar();

  var dataObj = {
    month: month,
    monthIndex: monthIndex,
    monthAbrv: monthAbrv,
    monthLength: monthLength,
    numberOfWeeks: calendar.length,
    firstOfMonthStr: firstOfMonthStr,
    year: date.getFullYear(),
    week: week,
    weekAbrv: week.map(function (day) {
      return day.substring(0, 2);
    }),
    weekLetter: week.map(function (day) {
      return day.substring(0, 1);
    }),
    calendar: calendar
  };

  return dataObj;
};

exports.default = calendarFactory;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FULL_MONTHS = exports.FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var ABRV_MONTHS = exports.ABRV_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

var DAYS_OF_WEEK = exports.DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var MONTH_LENGTHS = exports.MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONSTANTS = exports.htmlCalendar = exports.textCalendar = exports.default = undefined;

var _calendarFactory = __webpack_require__(0);

var _calendarFactory2 = _interopRequireDefault(_calendarFactory);

var _textCalendar = __webpack_require__(4);

var _textCalendar2 = _interopRequireDefault(_textCalendar);

var _htmlCalendar = __webpack_require__(5);

var _htmlCalendar2 = _interopRequireDefault(_htmlCalendar);

var _constants = __webpack_require__(1);

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _calendarFactory2.default;
exports.textCalendar = _textCalendar2.default;
exports.htmlCalendar = _htmlCalendar2.default;
exports.CONSTANTS = CONSTANTS;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonthLength = exports.getMonthStr = exports.capitalizeFirstLetter = undefined;

var _constants = __webpack_require__(1);

var capitalizeFirstLetter = exports.capitalizeFirstLetter = function capitalizeFirstLetter(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
};

var getMonthStr = exports.getMonthStr = function getMonthStr(date) {
  return capitalizeFirstLetter(_constants.FULL_MONTHS[date.getMonth()]);
};

var getMonthLength = exports.getMonthLength = function getMonthLength(month) {
  return _constants.MONTH_LENGTHS[_constants.FULL_MONTHS.indexOf(month)];
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calendarFactory = __webpack_require__(0);

var _calendarFactory2 = _interopRequireDefault(_calendarFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textCalendar = function textCalendar(date, options) {
  var calendar = (0, _calendarFactory2.default)(date, options);

  var headingOffset = Math.ceil((21 - (calendar.month.length + ('' + calendar.year).length + 1)) / 2);
  var month = new Array(headingOffset).join(' ') + calendar.month + ' ' + calendar.year;

  var week = '';
  calendar.week.forEach(function (day) {
    var str = day.substring(0, 2);
    week += str + ' ';
  });

  var calendarStr = '';
  calendar.calendar.forEach(function (row) {
    row.forEach(function (day) {
      if (day.date === 0) {
        calendarStr += '  ';
      } else if (day.date < 10) {
        calendarStr += ' ' + day.date;
      } else {
        calendarStr += day.date;
      }
      calendarStr += ' ';
    });
    calendarStr += '\n';
  });

  var fullStr = month + '\n' + week + '\n' + calendarStr;
  return fullStr;
};

exports.default = textCalendar;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calendarFactory = __webpack_require__(0);

var _calendarFactory2 = _interopRequireDefault(_calendarFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var htmlCalendar = function htmlCalendar(date, options) {
  var calendar = (0, _calendarFactory2.default)(date, options);

  var header = '<table border="0" cellpadding="0" cellspacing="0" class="month">\n' + '  <thead>\n' + '    <tr>\n' + '      <th colspan="7" class="month">' + calendar.month + ' ' + calendar.year + '</th>\n' + '    </tr>\n';

  var week = '    <tr>\n';
  calendar.week.forEach(function (weekDay) {
    week += '      <th class="' + weekDay.substring(0, 3).toLowerCase() + '">' + weekDay.substring(0, 3) + '</th>\n';
  });
  week += '    </tr>\n  </thead>\n';

  var body = '  <tbody>\n';
  calendar.calendar.forEach(function (row) {
    var rowHtml = '    <tr>\n';
    row.forEach(function (date) {
      rowHtml += '      <td class="' + (date.date ? date.day.substring(0, 3).toLowerCase() : 'noday') + '">' + (date.date ? date.date : '&nbsp;') + '</td>\n';
    });
    rowHtml += '    </tr>\n';
    body += rowHtml;
  });
  body += '  </tbody>\n';

  var footer = '</table>\n';

  return header + week + body + footer;
};

exports.default = htmlCalendar;

/***/ })
/******/ ]);
});