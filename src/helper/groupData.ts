function groupData<T, K extends keyof T>(arr: T[], property: K): Record<string, T[]> {
  return arr.reduce((result, obj) => {
    const key = obj[property] as unknown as string;
    result[key] = result[key] || [];
    result[key].push(obj);
    return result;
  }, {} as Record<string, T[]>);
}

export default groupData;
