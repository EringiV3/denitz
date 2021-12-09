export const formatText = (str: string, maxLength: number) => {
  return str.length > maxLength ? `${str.substr(0, maxLength)}...` : str;
};
