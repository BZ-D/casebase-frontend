export const filterEmptyStr = (str: string|null|undefined) => {
  return str === '' || str === null || str === undefined ? '无' : str;
}