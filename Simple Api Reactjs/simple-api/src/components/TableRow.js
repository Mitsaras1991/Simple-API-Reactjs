import React,{useState,useEffect} from 'react'
//import Link from 'react-router-dom'
import PopUp from './PopUp'
const TableRow=({post,index})=>{
    const [popUpContent,setPopUp]=useState(false)
    const togglePopUp=(e)=>{
        e.preventDefault();
        setPopUp(!popUpContent)
    }
  
 return  ( <>  
    <tr>
             <th scope="row">{index}</th>
             <td>{post.userId}</td>
             <td>{post.title}</td>
             <td>
             <button onClick={()=>setPopUp(!popUpContent)} 
             className="btn btn-primary" type="button" >
                    View
           </button>
               </td>
           </tr>
           <PopUp showPopUp={popUpContent} showToggle={togglePopUp}>
               
                    <div className="popup-header">
                        <span>From user {post.userId}</span>
                        <button onClick={togglePopUp} type="button" class="btn btn-primary btn-sm">X</button>
                    </div>
                    <div className="popup-container">
                   {post.body}
                    </div>
           </PopUp>
           </> 
   )
}
   
 

export default TableRow;