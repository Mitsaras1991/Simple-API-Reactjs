import React from 'react'
import PopUp from './PopUp'

const ErrorComponent=({error,closePopup,...rest})=>{
    return(
    <>
        <PopUp {...rest}>
            <button onClick={closePopup} type="button" class="btn btn-primary btn-sm">X</button>
            <div className="popup-container">
                   {error}
            </div>
        </PopUp>
    </>)
}

export default ErrorComponent;