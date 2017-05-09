export default (position, time) => {
  if (time > 0) {
    let hour = parseInt(time / 60 / 60);
    hour = hour > 9 ? hour : '0' + hour;
    let min = parseInt(time / 60 % 60);
    min = min > 9 ? min : '0' + min;
    let sec = parseInt(time % 60);
    sec = sec > 9 ? sec : '0' + sec;
    if (position === 3) return `${hour}:${min}:${sec}`;
    return `${min}:${sec}`;
  } else {
    if (position === 3) return '00:00:00';
    return '00:00';
  }
};
