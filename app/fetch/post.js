import 'whatwg-fetch'
import 'es6-promise'

export function submitData(url, data) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        //headers: {
        //    'Accept': 'application/json, text/plain, */*',
        //    'Content-Type': 'application/x-www-form-urlencoded'
        //},
        body: data
    });

    return result;
}

