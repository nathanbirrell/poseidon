// Shorthand moment JS strings
import moment from 'moment';

export default () => {
  moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'just now',
        ss : '%d secs',
        m:  "just now",
        mm: "%d min",
        h:  "an hr",
        hh: "%d hrs",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
  });
}