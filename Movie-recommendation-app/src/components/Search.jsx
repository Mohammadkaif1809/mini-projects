import React from 'react'
import searchIcon from "../assets/search.svg"

const Search = ({searchTerm,setSearchTerm}) => {

  return (
    <div className='search'>
      <div>
        <img src={searchIcon} alt="search" />
        <input type="text" placeholder='Enter the Movie Name'
        value={searchTerm}
        onChange={(evt)=>setSearchTerm(evt.target.value)}
        
        />
      </div>
    </div>
  )
  
}

export default Search
