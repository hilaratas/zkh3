function newOrder(arr) {
  var res = arr.slice();
  var length = res.length;
  var randIx;
  var newEl = {};

  for (let i = 0; i < 1; i++ ) {
    randIx = randomInteger(0,length);
    Object.assign(newEl, arr[randIx]);
    newEl.millitime = Date.now();
    res.unshift(newEl);
  }

  return res;

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
  }

}

module.exports = newOrder;