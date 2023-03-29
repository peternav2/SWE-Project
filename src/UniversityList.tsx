import React, { useState } from 'react';

const UniversityTab = (props : any) => {
    return (
    <div>
      <div>
          <button 
            type="button"
            className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            onClick={props.function}
            value = {props.university.name}
            id = 'field'>
            {props.university.name}
          </button>
      </div>
    </div>
    )
}

function SearchList(props:any){
    const filtered = props.universities.map((university:any) => <UniversityTab key = {university.name} university = {university} function = {props.func}/>)
    return (
        <div>
            {filtered}
        </div>
    );
}

const Scroll = (props:any) => {
    return(
        <div style={{overflowY: 'scroll', height:'10vh'}}>
            {props.children}
        </div>	
    );
}

function Search(props:any) {

    const [searchField, setSearchField] = useState({
      field: "",
      clicked_field:""
    });
  
    const handleChange = (event:any) => {
      setSearchField({
        ...searchField,
        [event.target.id]: event.target.value,
      });
      
    };

    const handleClick = (event:any) => {
      setSearchField({...searchField, ['clicked_field']: event.target.value})
      props.change(event.target.value)
    }

    const filteredData = props.details.filter((university:any) => university.name.toLowerCase().includes(searchField.field.toLowerCase()));
  
    function searchList(func:any) {
      return (
        <Scroll>
          <SearchList universities={filteredData} func = {func}/>
        </Scroll>
      );
    }
  
    return (
      <div>
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          <label className= "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
          University : {searchField.clicked_field}
          </label>
          <input 
            type = "search" 
            placeholder = "Search" 
            onChange = {handleChange}
            id = "field"
            value = {searchField.field}
            className= "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
      </label>
      </div>
      {searchList(handleClick)}
      </div>
    )
    }

export default Search;