/**生成随机Id */
const get_Id = () => {
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let Id = "";
  for (let i = 0; i < 16; i++) {
    Id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return Id;
};

const getCurTime = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var weekday = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (month < 10) {
      month = "0" + month;
  }
  if (weekday < 10) {
      weekday = "0" + weekday;
  }
  if (hour < 10){
      hour = "0" + hour;
  }
  if (minute < 10){
      minute = "0" + minute;
  }
  if (second < 10){
      second = "0" + second;
  }
  return (
    year +
    "/" +
    month +
    "/" +
    weekday +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );
};

// 时间戳
const timeStamp = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var weekday = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var millisecond = date.getMilliseconds();
  if (month < 10) {
      month = "0" + month;
  }
  if (weekday < 10) {
      weekday = "0" + weekday;
  }
  if (hour < 10){
      hour = "0" + hour;
  }
  if (minute < 10){
      minute = "0" + minute;
  }
  if (second < 10){
      second = "0" + second;
  }
  if (millisecond < 10){
      millisecond = "0" + millisecond;
  }
  return (year.toString() + month.toString() + weekday.toString() + hour.toString() + minute.toString() + second.toString() + millisecond.toString());
};

let obj = {
  get_Id,
  getCurTime,
  timeStamp
};

export default obj;
