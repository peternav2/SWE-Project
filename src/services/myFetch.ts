const API_ROOT = 'http://localhost:3000/api/v1/';

export default function myFetch<T>(url: string, data?: any, method?: string ): Promise<T> {

    if (method == 'DELETE'){
        const option: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        console.log("fetch");
        console.log(JSON.stringify(data));
        
        return fetch(API_ROOT + url, option).then( x => x.json());
    }
    const options: RequestInit = {
        method: method ?? (data ? 'POST' : 'GET'),
        headers: { 
            'Content-Type': 'application/json',
        },
        // body: data ? JSON.stringify(data) : undefined,
        body: JSON.stringify(data),
        
    };
    console.log("here2")
    console.log(JSON.stringify(data));
    console.log(options.body);
    
    
    return fetch(API_ROOT + url, options).then( x=>x.json() );
}