// import { useState, useEffect } from 'react';
//
// type FetchFunction = () => Promise<Response>;
//
// function useFetchData<T>(fetchFunction: FetchFunction): [T | null, boolean, Error | null] {
//   const [data, setData] = useState<T | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<any>(null);
//
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetchFunction();
//         const json = await response.json();
//         setData(json);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     }
//
//
//   }, [fetchFunction]);
//
//   return [data, isLoading, error];
// }
//
// export default useFetchData;
export {};