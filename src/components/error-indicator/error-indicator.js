import React from "react";

import './error-indicator.css'
import icon from './death-star-png-2nd-3.ico'

const ErrorIndicator = () => {
  return (
    <h5 className='error-indicator text-warning mb-5'>
      <img src={ icon } alt='error icon'/>
      <strong className="boom">BOOM!</strong>
      <span>
        something has gone terrible wrong
      </span>
      <span>
        ( but we already sent droids to fix it ).
      </span>
    </h5>
  );
};

export default ErrorIndicator;