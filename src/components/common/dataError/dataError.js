import React from 'react';
import './dataError.scss';

const DataError = (props) => {
  return (
    <div className="data-error">
      <h6>{props.dataErrorMsg}</h6>
    </div>
  )
}
export default DataError;