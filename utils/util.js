const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 格式化日期
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

//判断两个对象是否相等
function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    var propA = a[propName];
    var propB = b[propName];
    if (propA !== propB) {
      return false;
    }
  }
  return true;
}

//判断两个数组对象是否相等
function isArrayObjectValueEqual(a, b) {
  for (var n = 0; n < a.length; n++) {
    var aProps = Object.getOwnPropertyNames(a[n]);
    var bProps = Object.getOwnPropertyNames(b[n]);
    if (aProps.length != bProps.length) {
      return false;
    }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      var propA = a[propName];
      var propB = b[propName];
      if (propA !== propB) {
        return false;
      }
    }
  }
  return true;
}


module.exports = {
  formatDateTime: formatDateTime,
  formatDate: formatDate,
  isObjectValueEqual: isObjectValueEqual,
  isArrayObjectValueEqual: isArrayObjectValueEqual
}