import React, { useContext, useEffect, useState } from "react";
import './Sidebar.css'
import { assets } from "../../src/assets/assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faBars, faGear, faHistory, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { geminiContext} from "../../context/GeminiContext";
function Sidebar(){
  const {
         onSend,
         setResponse,
         prevInputValue,
         stopSendingResponse,
         setIsQueryAsked,
         setShowPauseBtn,
        } = useContext(geminiContext);

  const [isExtended , setIsExtended] = useState(false);

  
  // creating history section
  useEffect(()=>{
    let history_containerTag = document.querySelector('.history-container');
    if(isExtended){
      // first remove all existed tags 
      if(history_containerTag != null){
        let historyTag = document.querySelectorAll('.history');
        historyTag.forEach((tag,i)=>{
          tag.remove();
        })
      }
      // then create history tags whenever preInputValue update
      prevInputValue.map((data,index)=>{
        let historyTag = document.createElement('div');
        historyTag.classList.add('history')
        historyTag.setAttribute('value',data);
        historyTag.addEventListener('click',handleHistoryItem);
        if(data.length >= 15){
          historyTag.innerText = data.slice(0,15) + '....';
        }else{
          historyTag.innerText = data;
        }
        history_containerTag.appendChild(historyTag);
      })
      
    }
  },[prevInputValue,isExtended]);

  function handleMenuBarBtn(e){
    setIsExtended(pre=>!pre)
    document.querySelector('.menu-bar-icon').classList.toggle('active-menu-bar-mobile');
    document.querySelector('.sidebar-container').classList.toggle('active-for-mobile');
    console.log(document.querySelector('.menu-bar-icon'));
  }
  
  function handleHistoryItem(e){
    let recentQuery = e.target.getAttribute('value');
    onSend(recentQuery);
    setIsQueryAsked(true)
    stopSendingResponse(false);
  }
  
  function handlePlusNewChatBtn(){
     console.log('hello');
     setIsQueryAsked(false);
     setShowPauseBtn(false);
  }


  return(
      <div className="sidebar-wrap">
             <div className="menu-bar-icon" onClick={handleMenuBarBtn}>
               <FontAwesomeIcon icon={faBars}/>
             </div>
        <div className="sidebar-container">
          <div className="part1">
             <div className="plus-icon" onClick={handlePlusNewChatBtn}>
               <FontAwesomeIcon icon={faPlus}/>
               {
                isExtended ? 
               <pre className="new-chat">New Chat</pre>:null
               }
             </div>
             <div className="recent-section">
               {
                isExtended ? 
                      <div className="search-history">
                        <div className="heading">
                          Recent
                        </div>
                          {
                            prevInputValue.length == 0 ?
                              <p className="no-history">No History Available</p>
                              :
                              <div className="history-container">
                                {/* {
                                  prevInputValue.map((data,index)=>{
                                     return <div onClick={handleHistoryItem} key={index} className={`history ${data}`}>
                                              {
                                                data.slice(0,15) + '....'
                                              }
                                            </div>
                                  })
                                } */}
                              </div>
                          }
                      </div>: null
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
             <div className="logout-icon">
               <FontAwesomeIcon icon={faRightFromBracket}/>
               {
                isExtended ? <p>Log out</p>: null
               }
             </div>
          </div>
        </div>
      </div>  
    )
}

export default Sidebar