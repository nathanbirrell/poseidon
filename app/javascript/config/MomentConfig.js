// Shorthand moment JS strings
import moment from 'moment';

export default () => {
  moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'just now',
        ss : '%ds',
        m:  "just now",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    },
    calendar : {
      lastDay : '[Yesterday] LT',
      sameDay : '[Today] LT',
      nextDay : '[Tomorrow] LT',
      lastWeek : '[last] dddd LT',
      nextWeek : 'dddd LT',
      sameElse : 'L'
    }
  });
}