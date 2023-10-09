export const orderData = (index: number, data: any[], updatedData: any): any[] => {
  let currentData = [...data];
  let modified = currentData[index];
  modified = updatedData;
  currentData[index] = modified;

  return currentData;
}
