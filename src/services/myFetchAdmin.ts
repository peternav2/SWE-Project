const API_URL = 'http://localhost:3000/api/v1/';

export function rest(url: string){
    return fetch(url).then(res => res.json());
}

export function api(url: string){
    return rest(API_URL + url);
}