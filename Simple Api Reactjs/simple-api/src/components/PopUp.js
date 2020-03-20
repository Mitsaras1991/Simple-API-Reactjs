import React,{useState,useEffect} from 'react'
import './PopUpStyle.css'
const PopUp=(props)=>{
    const classSelect=props.showPopUp? "showPopup": "hidePopuP"
/*     console.log("Show PopUp window " + props.showPopUp)
    console.log(" Select Class " + classSelect) */
    console.log(props)
    return(
        <div className={classSelect}>
         <div className="popup-content">
            {props.children}
         </div> 
        </div>
    )
}

export default PopUp