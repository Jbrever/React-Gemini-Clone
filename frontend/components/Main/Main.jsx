import React, { useContext, useEffect, useState } from "react";
import './Main.css'
import {Sidebar} from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faLightbulb, faMessage, faPaperPlane, } from "@fortawesome/free-regular-svg-icons";
import { faCaretRight, faCode , faPauseCircle} from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../src/assets/assets";
import { geminiContext } from "../../context/GeminiContext";

function Main(){
  const {onSend,
         response,
         setResponse,
         inputValue,
         setInputValue,
         prevInputValue,
         animationLoader,
         giminiIconAnimate,
         setGiminiIconAnimate,
         isQueryAsked,
         setIsQueryAsked,
         showPauseBtn,
         stopSendingResponse,
        } = useContext(geminiContext);
  // let [isQueryAsked , setIsQueryAsked ] = useState(false);
  let [showSendIcon,setShowSendIcon] = useState(false);
  // submitQuery state is used to store previous input value to show on user-query section beside user-icon
  let [submitedQuery , setSubmitedQuery] = useState('');
  let [contentScrollingAllowed,seContentScrollingAllowed] = useState(true);
  const handleInputValue = (e) => {
    setInputValue(e.target.value)
    if(e.target.value != '') setShowSendIcon(true)
    else setShowSendIcon(false)
  }

const handleOnInputKeyUp = (e)=>{
  let query = undefined; 
  if(typeof(e) == 'string'){
    query = e;
  }
  // above code for asked query by cards at landing page
  if(typeof(e) == 'string' || e._reactName == 'onClick' || ( e._reactName == 'onKeyUp' &&  e.key == "Enter")){
    console.log(query);
    setIsQueryAsked(true);
    setGiminiIconAnimate(true);
    onSend(query);
    if(query) setSubmitedQuery(query);
    else setSubmitedQuery(inputValue)
    setInputValue('');
    setShowSendIcon(false);
    stopSendingResponse(false);
    setResponse('');
  }
}

// query by cards at landing page
useEffect((e)=>{
  let cards = document.querySelectorAll('.card');
  cards.forEach((card)=>{
    card.addEventListener('click',(e)=>{
    console.log('kkk');
    handleOnInputKeyUp(e.target.innerText);
      setIsQueryAsked(true);
    })
  })
},[isQueryAsked]);
// for page scrolling when response adding in content-part
useEffect(()=>{
  if(response != ''){
    let contentPart = document.querySelector(".content-part");
    let mainContain = document.querySelector(".main-content");

    // auto scrolling
    if(contentScrollingAllowed){
      let pageHeight = contentPart.scrollHeight;
      contentPart.scrollTop = pageHeight;
    }
    // for stop auto scrolling in desktop
    contentPart.addEventListener('wheel',(e)=>{
      seContentScrollingAllowed(false)
    })
    
    // for stop auto scrolling in mobile
    contentPart.addEventListener('touchmove',(e)=>{
      seContentScrollingAllowed(false)
    })
    
    // console.log(contentPart.scrollHeight);
    // if(contentPart.scrollHeight <= contentPart.scrollTop  + 750){
    //   seContentScrollingAllowed(true)
    // }
  }
},[response,contentScrollingAllowed])

  return(
        <div className="main-container">
          <nav>
            <div className="main-heading">
              Jbr Gemini
            </div>
            <div className="profile-icon">
              
            </div>
          </nav>
          <div className="content-part">
            {/* if query asked by user so after-query named div would be show other bofore-query named div */}
          {
          isQueryAsked ?
           <div className="after-query">
             <div className="after-query-container">
              <div className="user-icon">
                <div className="icon">
                                  
                </div>
                <div className="user-query">
                  {inputValue == '' ?
                      submitedQuery == '' ? 
                         'How can i help you today ?'
                         : 
                         submitedQuery 
                      : 
                      inputValue
                  }
                </div>
              </div>
              <div className="main-content">
                <div className="gemini-icon">
                  {
                    giminiIconAnimate
                    ? <img className="animate-active" src={assets.gemini_icon} alt="" />
                    : <img src={assets.gemini_icon} alt="" />
                  }
                  
                </div>
                <div dangerouslySetInnerHTML={{__html:response}} className="ai-reply">
                
                </div>
                {
                  animationLoader
                  ?
                <div className="loader-containr">
                   <div className="loader-animation"></div>
                   <div className="loader-animation"></div>
                   <div className="loader-animation"></div>
                </div>
                : 
                null
                }
              </div>
             </div>
           </div>
            // ------------------------------------>
            :
            // ------------------------------------>
            <div className="before-query">
              <div className="texts">
                <div className="user-name">
                   <h1>Hello,</h1>
                </div>
                <div className="heading">
                   <h1>How can i help you today?</h1>
                </div>
              </div>
              <div className="cards-container">
                  <div className="card" >
                      Suggest beautiful places to see on a upcoming road trip
                    <div className="icon">
                      <FontAwesomeIcon icon={faCompass}/>
                    </div>
                  </div>
                  <div className="card">
                    Briefly summarize this concept: urban planning
                    <div className="icon">
                      <FontAwesomeIcon icon={faLightbulb}/>
                    </div>
                  </div>
                  <div className="card">
                    Brainstrom team bonding activities for our work retreat
                    <div className="icon">
                      <FontAwesomeIcon icon={faMessage}/>
                    </div>
                  </div>
                  <div className="card">
                    Tell me about React js and React native 
                    <div className="icon code-icon">
                      <FontAwesomeIcon icon={faCode}/>
                    </div>
                  </div>
              </div>
            </div>
          }
              
          </div>
          <div className="bottom-part">
              <div className="input-container">
                <div className="input-box">
                  <input onKeyUp={handleOnInputKeyUp} onChange={handleInputValue} value={inputValue} type="text" placeholder="Ask Jbr Gemini"/>
                  {
                    // i used handleOnInputKeyUp function on both event (onKeyUp and onClick) because both event should be work same;
                    showSendIcon ? <img onClick={handleOnInputKeyUp} className="send-icon" src={assets.send_icon} alt="" />
                    : showPauseBtn 
                                ? 
                                <FontAwesomeIcon onClick={()=>stopSendingResponse(true)} className="pause-icon" icon={faPauseCircle} /> 
                                : null
                  }
                </div>
              </div>
              <div className="mistake-warning">
                <p>Jbr Gemini can make mistakes, so double-check it ( made by jbrever )</p>
              </div>
          </div>
        </div>
    )
}

export default Main