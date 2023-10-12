import { formatString } from "../helper/utils";

export const checkNewDuplicate = (data: any, name: string) => {
  const duplicate = data.find((d: any) => formatString(d.name || d.title) == formatString(name));
  return duplicate;
};

export const checkExistingDuplicate = (data: any, formerName: string, name: string) => {
  const filteredData = data.filter((d: any) => formatString(d.name || d.title) !== formatString(formerName))
  const duplicate = filteredData.find((d: any) => formatString(d.name || d.title) == formatString(name));
  return duplicate;
};

export const duplicatesInArry = (
  arr: any[]
): boolean => {
  let values: string[] = [];

  for (let obj of arr) {
    const name = formatString(obj.name || obj.title);
    if ((values.includes(name))) {
      return true
    }
    values.push(name);
  }

  return false;
};
