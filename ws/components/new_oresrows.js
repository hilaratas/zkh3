function newArray(arr) {
  var res = arr.slice();
  var length = res.length;

  for (let i = 0; i < 5; i++ ) {
    var rand = randomInteger(0,length);
    res.unshift(arr[rand]);
  }

  return res;

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
  }

}

module.exports = newArray;