export const declOfNum = (number, titles) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
}

export const milliToSec = (ms) => {
  return (ms/1000).toFixed(0);
}

export const devider = (number) => {
  return number.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

export const isTouch = () => {
	return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
}