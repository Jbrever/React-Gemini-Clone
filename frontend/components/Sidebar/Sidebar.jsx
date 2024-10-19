import React, { useState } from "react";
import './Sidebar.css'
import { assets } from "../../src/assets/assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faBars, faGear, faHistory, faPlus } from '@fortawesome/free-solid-svg-icons'

function Sidebar(){
  const [isExtended , setIsExtended] = useState(false);
    return(
        <div className="sidebar-container">
          <div className="part1">
             <div className="menu-bar-icon" onClick={()=>setIsExtended(pre=>!pre)}>
               <FontAwesomeIcon icon={faBars}/>
             </div>
             <div className="plus-icon">
               <FontAwesomeIcon icon={faPlus}/>
               {
                isExtended ? 
               <pre className="new-chat">New Chat</pre>:null
               }
             </div>
             <div className="recent-section">
               {
                isExtended ? <p>Recent</p>: null
               }
             </div>  
          </div>
          <div className="part2">
             <div className="question-icon">
               <FontAwesomeIcon icon={faQuestionCircle}/>
               {
                isExtended ? <p>Help</p>: null
               }
             </div>
             <div className="history-icon">
               <FontAwesomeIcon icon={faHistory}/>
               {
                isExtended ? <p>Activity</p>: null
               }
             </div>
             <div className="settion-icon">
               <FontAwesomeIcon icon={faGear}/>
               {
                isExtended ? <p>Setting</p>: null
               }
             </div>
          </div> 
        </div>
    )
}

export default Sidebar