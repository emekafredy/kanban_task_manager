export const throwBoardError = (
  columns: {name: string, tasks: []}[],
  columnDuplicates: boolean,
  exitingBoardName: boolean
) => {
  if (columns.length > 6) throw new Error('Board can only have 6 columns');
  if (columnDuplicates) throw new Error('Board column names must be unique');
  if (exitingBoardName) throw new Error('Board name already exists');

  return;
}
