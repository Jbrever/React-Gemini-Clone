import React from "react";
import './Main.css'
import {Sidebar} from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../src/assets/assets";
function Main(){
    return(
        <div className="main-container">
          <nav>
            <div className="main-heading">
              Jbr Gemini
            </div>
            <div className="profile-icon">
              M
            </div>
          </nav>
          <div className="content-part">
            <div className="user-icon">
                <div className="icon">
                  M                  
                </div>
                <div className="user-query">
                  hello , what is react
                </div>
            </div>
            <div className="main-content">
              <div className="ai-reply">
                Hello there! How can I assist you today?
                lorem*70
              </div>
            </div>
              
          </div>
          <div className="bottom-part">
              <div className="input-container">
                <div className="input-box">
                  <input type="text" placeholder="Ask Jbr Gemini"/>
                  <img className="send-icon" src={assets.send_icon} alt="" />
                  {/* <FontAwesomeIcon className="send-icon" icon={faCaretRight}/> */}
                </div>
              </div>
              <div className="mistake-warning">
                <p>Jbr Gemini can make mistakes, so double-check it</p>
              </div>
          </div>
        </div>
    )
}

export default Main