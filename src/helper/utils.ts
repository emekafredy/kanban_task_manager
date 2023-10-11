export const orderData = (index: number, data: any[], updatedData: any): any[] => {
  let currentData = [...data];
  let modified = currentData[index];
  modified = updatedData;
  currentData[index] = modified;

  return currentData;
}

const formatAndRemovespace = (str: string): string => {
  return str.toLowerCase().replaceAll(' ', '');
}

export const valueChanged = (val1: string, val2: string): boolean => {
  return formatAndRemovespace(val1) !== formatAndRemovespace(val2)
};

export const valuesChanged = (arr1: string[], arr2: string[]) => {
  const arr1Formatted = formatAndRemovespace(arr1.toString());
  const arr2Formatted = formatAndRemovespace(arr2.toString());

  return arr1Formatted !== arr2Formatted;
};

export const formatString = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g,' ').trim();
};

export const checkExistingColumn = (
  mode: string | undefined, 
  col: {name: string, tasks: []},
  exisitingColumns: {name: string, tasks: any[]}[]
): boolean => {
  let columnHasTasks = false;
  if (mode === "update") {
    const status = exisitingColumns?.find((column) => column.name === col.name);
    const hasTasks = (status?.tasks?.length || 0) > 0;

    columnHasTasks = hasTasks;
  }

  return columnHasTasks;
}
