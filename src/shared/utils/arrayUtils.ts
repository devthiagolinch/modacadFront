export const toggleItemInArray = <T extends { id?: string | number }>(
  array: T[],
  newItem: T,
  key: keyof T = 'id',
  maxLength?: number
): T[] => {
  const isSelected = array.some((item) => item[key] === newItem[key]);
  let updatedArray = [...array];

  if (isSelected) {
    updatedArray = updatedArray.filter((item) => item[key] !== newItem[key]);
  } else if (!maxLength || updatedArray.length < maxLength) {
    updatedArray.push(newItem);
  }

  return updatedArray;
};
