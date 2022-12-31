
export const moveInArray = function <T extends object>(
  arr: T[],
  from: number,
  to: number,
) {
  // Make sure a valid array is provided
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    throw new Error('Please provide a valid array');
  }
  const item = arr.splice(from, 1);
  arr.splice(to, 0, item[0]);
};

export const moveToOtherArray = function <T extends object>(
  sourceArr: T[],
  destArr: T[],
  from: number,
  to: number,
) {
  const item = sourceArr.splice(from, 1);
  destArr.splice(to, 0, item[0]);
};