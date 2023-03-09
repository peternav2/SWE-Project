import React, { useState } from 'react';

function UniversityTab({university}:any, {onClick}:any){
    return (
    <div>
      <div>
          <button 
            type="button"
            className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            onClick={onClick}
            value = {university.name}>
            {university.name}
          </button>
      </div>
    </div>
    )
}

function SearchList({universities}:any, onClick:any){
  const passedFunction = () => {
    alert("hello")
  }

    const filtered = universities.map((university:any) => <UniversityTab key = {university.name} onClick={passedFunction} university = {university}/>)
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

function Search({details}:any, {props}:any) {

    const [searchField, setSearchField] = useState({
      field: "",
    });
  
    const handleChange = (event:any) => {
      setSearchField({
        ...searchField,
        [event.target.id]: event.target.value,
      });
    };

    const handleClick = (event:any) => {
      setSearchField({
        ...searchField,
        [searchField.field]: event.target.value,
      });
    }

    const filteredData = details.filter((university:any) => university.name.includes(searchField.field));
  
    function searchList() {
      return (
        <Scroll>
          <SearchList universities={filteredData} onClick={handleClick}/>
        </Scroll>
      );
    }
  
    return (
      <div>
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          University
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
      {searchList()}
      </div>
    )
    }

export default Search;