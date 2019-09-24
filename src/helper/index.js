import moment from 'moment';

const checkPlural = (num) => (num > 1 || num === 0 ? 's' : '');

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

const countPrice = (monthlyPrice) => {
  const dailyPrice = monthlyPrice / moment().daysInMonth();
  const daysTillEndMonth = moment()
    .endOf('month')
    .diff(moment(), 'days');

  return priceFormatter.format(dailyPrice * daysTillEndMonth);
};

const countCancellationDate = (commitmentPeriod, date = new Date()) => moment(date)
    .add(commitmentPeriod, 'months')
    .startOf('month')
    .format('YYYY-MM-DD');

const countEndDate = (cancellationPeriod, date = new Date()) => moment(date)
    .add(cancellationPeriod, 'months')
    .endOf('month')
    .subtract(1, 'months')
    .format('YYYY-MM-DD');

export {
 checkPlural, priceFormatter, countPrice, countCancellationDate, countEndDate 
};
