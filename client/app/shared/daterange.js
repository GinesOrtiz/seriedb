import moment from '../../custom_vendors/moment/moment-timezone-with-data-2010-2020';

/**
 * Date Formatter. This is the Factory in charge of formatting the dates that are going to be send
 * to the API
 *
 * - The only methods that needs to be formatted (with `.format()` are the `fromDate` & the
 * `toDate()`.
 * - All the other methods are allways be passed as a parameter to the above two.
 *
 * @returns {*}
 * @private
 */

const daterange = () => {
  'use strict';
  /**
   * HACK ALERT!!
   *
   * This date is the current Server Date. Because we actually does not save the data with UTC,
   * we need to convert the Front Dates to the Current Server Date for the Data to make sense & not
   * hide it...
   *
   * When we can save all the data with UTC in Server, & ask for it with UTC date format, we can
   * `UnHack` this
   *
   */
  let currentDate = (date = new Date()) => {
    return moment(date)
      .tz('Europe/Amsterdam');
  };

  let fromDate = (date, useActualDate = true) => {
    if (useActualDate) {
      return `${currentDate(date)
        .format('YYYY-MM-DD')} 00:00:00`;
    }
    else {
      return moment(date)
          .format('YYYY-MM-DD') + ' 00:00:00';
    }

    //return `${moment(date).format('YYYY-MM-DD')} 00:00:00`;
  };

  let toDate = (date, useActualDate = true) => {
    if (useActualDate) {
      return `${currentDate(moment(date)
        .format('YYYY-MM-DD'))
        .format('YYYY-MM-DD')} 23:59:59`;
    }
    else {
      return moment(date)
          .format('YYYY-MM-DD') + ' 23:59:59';
    }
    //return `${moment(date).format('YYYY-MM-DD')} 23:59:59`
  };

  let dateHour = (date, useActualDate = true) => {
    if (useActualDate) {
      return `${currentDate(moment(date)
        .format('YYYY-MM-DD HH:mm:ss'))
        .format('YYYY-MM-DD  HH:mm:ss')}`;
    }
    else {
      return moment(date)
        .format('YYYY-MM-DD HH:mm:ss');
    }
  };

  let yesterday = () => {
    return currentDate()
      .subtract(1, 'days');
  };

  let nowMinusOneDay = (date = new Date()) => {
    return moment(date)
      .subtract(1, 'days');
  };

  let today = () => {
    return currentDate();
  };

  let monthInit = () => {
    const month = currentDate()
      .format('MM');
    const year = currentDate()
      .year();

    return `${year}-${month}-01`;
  };

  let last = (number, predicate) => {
    return currentDate()
      .subtract(number, predicate);
  };

  /**
   * From day 1 of previous month
   * @returns {string}
   */
  let lastMonthInit = () => {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);

    const month = currentDate(d)
      .format('MM');
    const year = currentDate(d)
      .year();

    return `${year}-${month}-01`;
  };

  let lastMonthEnd = () => {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);

    const month = currentDate(d)
      .format('MM');
    const year = currentDate(d)
      .year();

    return `${year}-${month}-${new Date(year, month, 0).getDate()}`;
  };

  let inLastMonthToDate = () => {
    let d = new Date();
    d.setMonth(d.getMonth() - 1);

    return moment(d).format('YYYY-MM-DD HH:mm:ss');

  };

  return {
    currentDate,
    fromDate,
    toDate,
    dateHour,
    yesterday,
    nowMinusOneDay,
    today,
    monthInit,
    last,
    lastMonthInit,
    lastMonthEnd,
    inLastMonthToDate
  };
};

export {daterange};
