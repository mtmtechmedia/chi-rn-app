import {DataType} from './type';

export const areaCount = (data: [DataType] | DataType[]) => {
  return data.reduce((arr, e) => {
    const area = e.Area;
    arr[area] = (arr[area] || 0) + 1;
    return arr;
  }, {});
};
