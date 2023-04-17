export function getInfoBox(message:string){
    return(
    <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">Info alert!</span> {message}
    </div>
  </div>
    )
}

export function getInfoList(messages: string[]){
    return(
    <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Notice:</span>
          <ul className="mt-1.5 ml-4 list-disc list-inside">
            {
                messages.map((message)=>{return <li className="list-group-item list-group-item-info">{message}</li>})
            }
        </ul>
      </div>
    </div>
    )
}

export function getErrorList(messages: string[]){
    return(
    <div className="justify-center items-center mt-4 space-x-3 flex p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50" role="alert">
      <svg aria-hidden="true" className="justify-center items-center flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <span className="justify-center items-center sr-only">Error!</span>
      <div>
        <span className="justify-center items-center font-medium">Issues:</span>
        <ul className="mt-1.5 ml-4 list-disc list-inside">
            {
                messages.map((message)=>{return <li className="justify-center items-center list-group-item list-group-item-info">{message}</li>})
            }
        </ul>
      </div>
    </div>
    )
}

export function getErrorBox(message:string){
    return(
    <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-400" role="alert">
    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <span className="sr-only">Error!</span>
    <div>
      <span className="font-medium">Issue: </span> {message}
    </div>
  </div>
    )
}

export function getSuccessBox(message:string){
    return(
    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Success! {message}</span> 
    </div>
    )
}
