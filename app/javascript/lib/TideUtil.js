import moment from 'moment';

const getDayObject = (day) => {
  return {
    date: moment(day).startOf('day').format(),
    tides: [],
  }
};

class TideUtil {
  static splitTidesIntoDays(tides) {
    const days = [];

    days.push(getDayObject(tides[0].date_time));

    tides.forEach((tideRecord) => {
      const lastDay = days[days.length - 1];
      const addNewDay = !moment(lastDay.date).isSame(tideRecord.date_time, 'day');

      if (addNewDay) {
        days.push(getDayObject(tideRecord.date_time));
      }

      days[days.length - 1].tides.push(tideRecord);
    });

    return days;
  }
}

export default TideUtil;
