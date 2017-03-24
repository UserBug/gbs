import mc from 'microseconds';

let timeStamps = {
  
};

export default class time {
  static microseconds() {
    return mc.now();
  }
  static mc = time.microseconds;
  
  static now() {
    return (new Date()).getTime();
  }

  static toMySql(unixTime = null) {
    return time.toSimple(unixTime, '-', ' ', ':', false);
  }

  static toSimple(unixTime = null, sd = '-', sb = ' ', st = '_', ms = true) {
    let date = time.getDateFrom(unixTime);
    return date.getUTCFullYear() + sd +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + sd +
      ('00' + date.getUTCDate()).slice(-2) + sb +
      ('00' + date.getUTCHours()).slice(-2) + st +
      ('00' + date.getUTCMinutes()).slice(-2) + st +
      ('00' + date.getUTCSeconds()).slice(-2) +
      (ms ? sb + ('000' + date.getUTCMilliseconds()).slice(-3) : '');
  }
  
  static toString(unixTime) {
    let date = time.getDateFrom(unixTime);
    let str = time.toMySql(date);
    
    return str + ' ' + date.getUTCMilliseconds();
  }
  
  static getDateFrom(income) {
    if (income instanceof Date) {
      return income;
    } else {
      return new Date(income || time.now());
    }
  }
  
  static mySqlToTime(datetimeStr) {
    let dateArr = datetimeStr.split(/[- :]/);
    let date = new Date(dateArr[0], dateArr[1]-1, dateArr[2], dateArr[3], dateArr[4], dateArr[5]);
    return Math.round(date.getTime()/1000);
  }
  
  static start(name) {
    timeStamps[name] = time.mc();
    return timeStamps[name];
  }
  
  static end(name, inMicro = false) {
    if (name in timeStamps) {
      let mc = time.mc() - timeStamps[name];
      delete timeStamps[name];
      mc = inMicro ? mc : mc/1000;
      return Math.round(mc);
    } else {
      return null;
    }
  }
}
