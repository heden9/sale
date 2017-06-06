import { get } from './../get.js';

export function getListData(id,search){
    const s1 = search ? search : '-1',
          i1 = id ? id : -1;
    let result;
    if(__DEV__)
       result = get(`/api/sell/goods/list_goods`);
    else
       result = get(`/index.php/goods/list_goods`);
    return result;
}