import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchBar.scss';

const SearchInput = (props) => {
   const handleInputChange = (e) =>{
      props.handleInputChange(e.target.value)
   }
   return (
      <div className="search-bar">
         <FontAwesomeIcon icon={faSearch} 
            className="search-input-icon" />
         <input type="search" 
            placeholder={props.placeholder} 
            className="search-input" 
            onChange={handleInputChange}
         /> 
      </div>
   )
}
export default SearchInput;