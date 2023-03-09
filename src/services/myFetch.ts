const API_ROOT = 'http://localhost:3000/api/v1/';

export default function myFetch<T>(url: string, data?: any, method?: string ): Promise<T> {

    if (method == 'DELETE'){
        const option: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        };   
        return fetch(API_ROOT + url, option).then(x => x.json());
    }
    const option: RequestInit = {
        method: method ?? (data ? 'POST' : 'GET'),
        headers: { 
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,  
    };
    return fetch(API_ROOT + url, option).then( x=>x.json() );
}