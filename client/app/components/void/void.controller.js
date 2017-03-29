import moment from 'moment';
class voidController {
  constructor() {
    this.range = {
      start: '27-08-2014',
      end: '30-08-2014'
    };
    this.ranges = [
      {
        name: 'Today',
        start: moment(),
        end: moment()
      },
      {
        name: 'Yesterday',
        start: moment()
          .subtract(1, 'd'),
        end: moment()
          .subtract(1, 'd')
      },
      {
        name: 'Current Month',
        start: moment()
          .startOf('month'),
        end: moment()
      }
    ];
    this.format = 'DD-MM-YYYY';
  }

  submitDate() {
    console.log(arguments);
  }
}

voidController.$inject = [];

export {voidController};
