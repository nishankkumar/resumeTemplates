/**
 * Method convert string in URL format and vice versa.
 */
export default function stringToUrl(string, isIn) {
  const resultStr = String(string).toLowerCase();

  if (isIn) {
    return resultStr.replace(/ /g, '-');
  }

  const newArr = resultStr.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.substr(1)
  );

  let newStr = newArr.join(' ');

  if (newStr.indexOf('And') !== -1) {
    newStr = newStr.replace(/And/g, 'and');
  } else if (newStr.indexOf('Of') !== -1) {
    newStr = newStr.replace(/Of/g, 'of');
  }

  return newStr;
}
