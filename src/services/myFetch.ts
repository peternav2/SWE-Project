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
    } else if (method == 'PATCH'){
        const option: RequestInit = {
            method: 'PATCH',
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
    return fetch(API_ROOT + url, option).then(x=>x.json());
}

/**
 * this is the function that will be used to fetch data from the backend via the Fetch API
 * 
 * @param url the url to fetch from the backend
 * @param data the data to send to the backend (if any)
 * @param method the method to use for the fetch eg GET, POST, DELETE, PATCH
 *
 * 
 * @returns a promise that resolves to the data returned from the backend
 * this promise is resolved by calling the .then() method on the promise
 * the .then() method takes a callback function that will be called when the promise is resolved 
 * the callback function will be passed the data returned from the backend
 * eg in the client you may want to create a new dininghall and then add it to the list of dininghalls locally, but before you can add the dining hall to the list of local
 * dining halls you need to get the _id of the dining hall that was just created in the backend therefore you will create a callback function
 * that will be called when the promise is resolved
 * in order to add the _id to your dining hall before adding it to the list of local dining halls
 *  eg
 *          await addDiningHallToUniversity(diningHall, universityId).then((response) => {
 *             diningHall._id = response._id;
 *             setDiningHalls([...diningHalls, diningHall]);
 *        }); // end of await   
 *            // if you do not use the await keyword, the function will not wait for the promise to be resolved before continuing to execute the rest of the code
 *            // this can lead to race conditions since you may not have the data you need for the rest of the code so dont forget the await keyword
 * 
 * 
 *      
 * 
 */