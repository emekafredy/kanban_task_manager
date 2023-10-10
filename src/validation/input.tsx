const formatstring = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g,' ').trim();
};

export const checkDuplicate = (data: any, name: string) => {
  const duplicate = data.find((d: any) => formatstring(d.name || d.title) == formatstring(name));
  return duplicate;
};
