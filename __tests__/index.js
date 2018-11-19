const moment = require('moment');
const date = require('date-fns');
const fr = require('date-fns/locale/fr');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime'); // load on demand
const weekOfYear = require('dayjs/plugin/weekOfYear'); // load on demand
const isBetween = require('dayjs/plugin/isBetween'); // load on demand
const isLeapYear = require('dayjs/plugin/isLeapYear'); // load on demand
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(isLeapYear);

const time = 1536484369695;

describe('Parse', () => {
  it('String + Date Format', () => {
    const m = moment('12-25-1995', 'MM-DD-YYYY');
    const [, mm, dd, yyyy] = /^(\d{2})-(\d{2})-(\d{4})$/.exec('12-25-1995');
    const n = new Date(`${mm}, ${dd} ${yyyy}`);
    const d = date.parse('12-25-1995', 'MM-dd-yyyy', new Date());
    const day = dayjs('12-25-1995');
    expect(m.valueOf()).toBe(n.getTime());
    expect(m.valueOf()).toBe(d.getTime());
    expect(m.valueOf()).toBe(day.valueOf());
  });
  it('String + Time Format', () => {
    const m = moment('2010-10-20 4:30', 'YYYY-MM-DD HH:mm');

    const [
      ,
      yyyy,
      mm,
      dd,
      hh,
      mi,
    ] = /^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/.exec('2010-10-20 4:30');
    const n = new Date(`${yyyy}-${mm}-${dd}T${('0' + hh).slice(-2)}:${mi}:00`);
    const d = date.parse('2010-10-20 4:30', 'yyyy-MM-dd H:mm', new Date());
    expect(m.valueOf()).toBe(n.getTime());

    const d = date.parse('12-25-1995', 'MM-dd-yyyy', new Date());
    expect(m.valueOf()).toBe(d.getTime());

    const day = dayjs('12-25-1995');
    expect(m.valueOf()).toBe(day.valueOf());

    const luxon = DateTime.fromFormat('12-25-1995', 'MM-dd-yyyy');
    expect(m.valueOf()).toBe(luxon.ts);
  });
  it('String + Format + locale', () => {
    const m = moment('2012 mars', 'YYYY MMM', 'fr');
    const d = date.parse('2012 mars', 'yyyy MMMM', new Date(), { locale: fr });
    expect(m.valueOf()).toBe(d.getTime());
  });
});

describe('Get + Set', () => {
  it('get Second', () => {
    const m = moment(time).seconds();
    const n = new Date(time).getSeconds();
    const d = date.getSeconds(new Date(time));
    const day = dayjs(time).second();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });
  it('set Second', () => {
    const m = moment(time)
      .seconds(30)
      .valueOf();
    const n = new Date(time).setSeconds(30);
    const d = date.setSeconds(new Date(time), 30).getTime();
    const day = dayjs(time)
      .set('second', 30)
      .valueOf();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });

  it('get Hour', () => {
    const m = moment(time).hours();
    const n = new Date(time).getHours();
    const d = date.getHours(new Date(time));
    const day = dayjs(time).hour();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });
  it('set Hour', () => {
    const m = moment(time)
      .hour(13)
      .valueOf();
    const n = new Date(time).setHours(13);
    const d = date.setHours(new Date(time), 13).getTime();
    const day = dayjs(time)
      .set('hour', 13)
      .valueOf();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });

  it('get Date of Month', () => {
    const m = moment(time).date();
    const n = new Date(time).getDate();
    const d = date.getDate(new Date(time));
    const day = dayjs(time).date();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });

  it('set Date of Month', () => {
    const m = moment(time)
      .date(4)
      .valueOf();
    const n = new Date(time).setDate(4);
    const d = date.setDate(new Date(time), 4).getTime();
    const day = dayjs(time)
      .set('date', 4)
      .valueOf();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });

  it('get Day of Week', () => {
    const m = moment(time).day();
    const n = new Date(time).getDay();
    const d = date.getDay(new Date(time));
    const day = dayjs(time).day();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });

  it('set Day of Week', () => {
    const m = moment(time)
      .day(-14)
      .valueOf();
    const n = new Date(time).setDate(new Date(time).getDate() - 14);
    const d = date.setDay(new Date(time), -14).getTime();
    const day = dayjs(time)
      .set('day', -14)
      .valueOf();
    expect(m).toBe(n);
    expect(m).toBe(d);
    expect(m).toBe(day);
  });

  it('get Day of Year', () => {
    const m = moment(time).dayOfYear();
    const n = Math.floor(
      (new Date(time) - new Date(new Date(time).getFullYear(), 0, 0)) /
        1000 /
        60 /
        60 /
        24
    );
    const d = date.getDayOfYear(new Date(time));
    expect(m).toBe(d);
    expect(n).toBe(d);
    expect(n).toBe(m);
  });

  it('set Day of Year', () => {
    const m = moment(time)
      .dayOfYear(256)
      .valueOf();
    const d = date.setDayOfYear(new Date(time), 256).getTime();
    expect(m).toBe(d);
  });

  it('get Week of Year', () => {
    const MILLISECONDS_IN_WEEK = 604800000;
    const firstDayOfWeek = 1; // monday as the first day (0 = sunday)
    const m = moment(time).week();
    const day = dayjs(time).week(); // plugin
    const t = new Date(time);
    const s = new Date(t.getFullYear(), 0, 1);
    s.setDate(s.getDate() + ((firstDayOfWeek - s.getDay()) % 7));
    const n = Math.round((t - s) / MILLISECONDS_IN_WEEK) + 1;
    const d = date.getWeek(new Date(time));
    expect(m).toBe(d);
    expect(m).toBe(day);
    expect(m).toBe(n);
    expect(n).toBe(day);
    expect(n).toBe(d);
  });

  it('set Week of Year', () => {
    const MILLISECONDS_IN_WEEK = 604800000;
    const firstDayOfWeek = 1; // monday as the first day (0 = sunday)

    const m = moment(time)
      .week(24)
      .valueOf();
    const n = new Date(time);
    const s = new Date(n.getFullYear(), 0, 1);
    s.setDate(s.getDate() + ((firstDayOfWeek - s.getDay()) % 7));
    const w = Math.round((n - s) / MILLISECONDS_IN_WEEK) + 1;
    n.setDate(n.getDate() - (w - 24) * 7);
    const d = date.setWeek(new Date(time), 24).getTime();
    expect(m).toBe(d);
    expect(m).toBe(n.getTime());
    expect(n.getTime()).toBe(d);
  });

  it('Days in Month', () => {
    const m = moment('2012-02', 'YYYY-MM').daysInMonth();
    const d = date.getDaysInMonth(new Date(2012, 1));
    const day = dayjs('2012-02').daysInMonth();
    const n = new Date(2012, 2, 0).getDate();
    expect(m).toBe(d);
    expect(m).toBe(day);
    expect(n).toBe(d);
    expect(n).toBe(day);
    expect(n).toBe(m);
  });

  it('get Weeks In Year', () => {
    const m = moment(time).isoWeeksInYear();
    const d = date.getISOWeeksInYear(new Date(time));
    expect(m).toBe(d);
  });

  it('Maximum of the given dates', () => {
    const array = [
      new Date(2017, 4, 13),
      new Date(2018, 2, 12),
      new Date(2016, 0, 10),
      new Date(2016, 0, 9),
    ];
    const m = moment.max(array.map(a => moment(a)));
    const n = new Date(Math.max.apply(null, array));
    const d = date.max(array);
    expect(m.valueOf()).toBe(d.getTime());
    expect(n).toEqual(new Date(2018, 2, 12));
    expect(d).toEqual(new Date(2018, 2, 12));
  });

  it('Minimum of the given dates', () => {
    const array = [
      new Date(2017, 4, 13),
      new Date(2018, 2, 12),
      new Date(2016, 0, 10),
      new Date(2016, 0, 9),
    ];
    const m = moment.min(array.map(a => moment(a)));
    const n = new Date(Math.min.apply(null, array));
    const d = date.min(array);
    expect(m.valueOf()).toBe(d.getTime());
    expect(n).toEqual(new Date(2016, 0, 9));
    expect(d).toEqual(new Date(2016, 0, 9));
  });
});

describe('Manipulate', () => {
  it('Add', () => {
    const m = moment(time).add(7, 'days');
    const d = date.addDays(new Date(time), 7);
    const n = new Date(time);
    n.setDate(n.getDate() + 7);
    const day = dayjs(time).add(7, 'day');
    expect(m.valueOf()).toBe(d.getTime());
    expect(m.valueOf()).toBe(day.valueOf());
    expect(n.valueOf()).toBe(m.valueOf());
    expect(n.valueOf()).toBe(day.valueOf());
    expect(n.valueOf()).toBe(d.getTime());
  });

  it('Subtract', () => {
    const m = moment(time).subtract(7, 'days');
    const n = new Date(new Date(time).getTime() - 1000 * 60 * 60 * 24 * 7);
    const d = date.subDays(new Date(time), 7);
    const day = dayjs(time).subtract(7, 'day');
    expect(m.valueOf()).toBe(d.getTime());
    expect(m.valueOf()).toBe(day.valueOf());
    expect(n.valueOf()).toBe(m.valueOf());
    expect(n.valueOf()).toBe(day.valueOf());
    expect(n.valueOf()).toBe(d.getTime());
  });

  it('Start of Time', () => {
    const m = moment(time).startOf('month');
    const d = date.startOfMonth(new Date(time));
    const day = dayjs(time).startOf('month');
    expect(m.valueOf()).toBe(d.getTime());
    expect(m.valueOf()).toBe(day.valueOf());
  });

  it('End of Time', () => {
    const m = moment(time).endOf('day');
    const n = new Date(time).setHours(23, 59, 59, 999);
    const d = date.endOfDay(new Date(time));
    const day = dayjs(time).endOf('day');
    expect(m.valueOf()).toBe(n);
    expect(m.valueOf()).toBe(d.getTime());
    expect(m.valueOf()).toBe(day.valueOf());
    expect(d.getTime()).toBe(day.valueOf());
    expect(n).toBe(d.getTime());
    expect(n).toBe(day.valueOf());
  });
});

describe('Display', () => {
  it('Format', () => {
    const m = moment(time).format('dddd, MMMM Do YYYY, h:mm:ss A');
    const d = date.format(new Date(time), 'eeee, MMMM do YYYY, h:mm:ss aa', {
      awareOfUnicodeTokens: true,
    });
    const day = dayjs(time).format('dddd, MMMM D YYYY, h:mm:ss A');
    expect(m).toBe(d);
    expect(moment(time).format('dddd, MMMM D YYYY, h:mm:ss A')).toBe(day);

    const m2 = moment(time).format('ddd, hA');
    const d2 = date.format(new Date(time), 'eee, ha');
    const day2 = dayjs(time).format('ddd, hA');
    expect(m2).toBe(d2);
    expect(m2).toBe(day2);
  });

  it('Time from now', () => {
    moment.relativeTimeThreshold(
      'd',
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    );
    const m = moment(time).fromNow();
    const d = date.formatDistance(new Date(time), new Date(), {
      addSuffix: true,
    });
    const day = dayjs(time).fromNow(); // plugin
    expect(m).toBe(d);
    expect(moment().fromNow()).toBe(dayjs().fromNow());
  });

  it('Time from X', () => {
    const m = moment([2007, 0, 27]).to(moment([2007, 0, 29]));
    const d = date.formatDistance(new Date(2007, 0, 27), new Date(2007, 0, 29));
    const day = dayjs('2007-01-27').to(dayjs('2007-01-29'));
    expect(m).toContain(d);
    expect(m).toBe(day);
  });

  it('Difference', () => {
    const m = moment([2007, 0, 27]).diff(moment([2007, 0, 29]));
    const n = new Date(2007, 0, 27) - new Date(2007, 0, 29);
    const d = date.differenceInMilliseconds(
      new Date(2007, 0, 27),
      new Date(2007, 0, 29)
    );
    const day = dayjs('2007-01-27').diff(dayjs('2007-01-29'), 'milliseconds');
    expect(m).toBe(d);
    expect(m).toBe(day);
    expect(n).toBe(d);
    expect(n).toBe(m);
    expect(n).toBe(day);

    const m2 = moment([2007, 0, 27]).diff(moment([2007, 0, 29]), 'days');
    const n2 = Math.ceil(
      (new Date(2007, 0, 27) - new Date(2007, 0, 29)) / 1000 / 60 / 60 / 24
    );
    const d2 = date.differenceInDays(
      new Date(2007, 0, 27),
      new Date(2007, 0, 29)
    );
    const day2 = dayjs('2007-01-27').diff(dayjs('2007-01-29'), 'days');
    expect(m2).toBe(d2);
    expect(m2).toBe(day2);
    expect(n2).toBe(m2);
    expect(n2).toBe(d2);
    expect(n2).toBe(day2);
  });
});

describe('Query', () => {
  it('Is Before', () => {
    const m = moment('2010-10-20').isBefore('2010-10-21');
    const n = new Date(2010, 10, 20) < new Date(2010, 10, 21);
    const d = date.isBefore(new Date(2010, 9, 20), new Date(2010, 9, 21));
    const day = dayjs('2010-10-20').isBefore('2010-10-21'); //plugin
    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
    expect(day).toBeTruthy();
    expect(n).toBeTruthy();
  });

  it('Is Same', () => {
    expect(moment('2010-10-20').isSame('2010-10-21')).toBeFalsy();
    expect(new Date(2010, 9, 20) === new Date(2010, 9, 21)).toBeFalsy();
    expect(
      date.isSameDay(new Date(2010, 9, 20), new Date(2010, 9, 21))
    ).toBeFalsy();
    expect(dayjs('2010-10-20').isSame('2010-10-21')).toBeFalsy();

    expect(moment('2010-10-20').isSame('2010-10-21', 'month')).toBeTruthy();
    expect(
      new Date(2010, 9, 20).toDateString().substring(4, 7) ===
        new Date(2010, 9, 21).toDateString().substring(4, 7)
    ).toBeTruthy();
    expect(
      date.isSameMonth(new Date(2010, 9, 20), new Date(2010, 9, 21))
    ).toBeTruthy();
  });

  it('Is After', () => {
    const m = moment('2010-10-20').isAfter('2010-10-19');
    const n = new Date(2010, 10, 20) > new Date(2010, 10, 19);
    const d = date.isAfter(new Date(2010, 9, 20), new Date(2010, 9, 19));
    const day = dayjs('2010-10-20').isAfter('2010-10-19');
    expect(m).toBeTruthy();
    expect(n).toBeTruthy();
    expect(d).toBeTruthy();
    expect(day).toBeTruthy();
  });

  it('Is Between', () => {
    const m = moment('2010-10-20').isBetween('2010-10-19', '2010-10-25');
    const d = date.isWithinInterval(new Date(2010, 9, 20), {
      start: new Date(2010, 9, 19),
      end: new Date(2010, 9, 25),
    });
    const day = dayjs('2010-10-20').isBetween('2010-10-19', '2010-10-25'); //plugin

    expect(m).toBeTruthy();
    expect(d).toBeTruthy();
    expect(day).toBeTruthy();
  });

  it('Is Leap Year', () => {
    expect(moment([2000]).isLeapYear()).toBeTruthy();
    expect(new Date(2000, 1, 29).getDate() === 29).toBeTruthy();
    expect(date.isLeapYear(new Date(2000, 0, 1))).toBeTruthy();
    expect(date.isLeapYear(new Date(2001, 0, 1))).toBeFalsy();
    expect(dayjs('2000').isLeapYear()).toBeTruthy();
  });

  it('Is a Date', () => {
    expect(moment.isDate(new Date())).toBeTruthy();
    expect(new Date() instanceof Date).toBeTruthy();
    expect(date.isDate(new Date())).toBeTruthy();
    expect(dayjs.isDayjs(dayjs())).toBeTruthy();
  });
});
