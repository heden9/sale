import { get } from './../get.js';

export function getListData(id,search){
    const s1 = search ? search : '-1',
          i1 = id ? id : -1;
    const result = get(`/api/detail/${i1}&${s1}`);
    return result;
}