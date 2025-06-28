/**
 * Move an array item from an index to another.
 *
 * @param arr array to operate on
 * @param from index to move the item from
 * @param to index to move the item to
 *
 * @returns a shallow copy of the array with the swapped item
 */
export const moveItem = <T>(arr: Array<T>, from: number, to: number) => {
  const newArr = [...arr];
  const item = newArr[from];
  newArr.splice(from, 1);
  newArr.splice(to, 0, item);
  return newArr;
};
