import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./searchBar.css"

const InputWithIcon = () => {
  return (
    <div className="seachBarContainer">
      <input type="text" className="SearchbarTxt" placeholder="Search" />
      <FontAwesomeIcon icon={faSearch} className="icon" />
    </div>
  );
};

export default InputWithIcon;
