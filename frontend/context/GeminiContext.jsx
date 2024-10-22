import React, { createContext, useState,useEffect, useRef } from "react";
import runChat from "../components/config/geminiApi";
import { faCode, faCopy, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const geminiContext = createContext();

export default function geminiContextProvider(probs){
    const [response , setResponse] = useState("");
    const [animationLoader, setAnimationLoader] = useState(false);
    const [inputValue , setInputValue] = useState('');
    const [prevInputValue , setPrevInputValue] = useState(inputValue);
    const [giminiIconAnimate , setGiminiIconAnimate ] =useState(false);
    const [showPauseBtn , setShowPauseBtn] = useState(false);
    const stopSendingResponseRef = useRef(false);
    const setTimeOutIDsRef = useRef([]);

    const stopSendingResponse = (bool)=>{
         stopSendingResponseRef.current = bool
     
         if(bool){
          setTimeOutIDsRef.current.forEach(id=>clearTimeout(id));
          setShowPauseBtn(false)
         }
    }
    async function onSend(query){
      setAnimationLoader(true);
      let result = undefined;
      if(inputValue != ''){
        result = await runChat(inputValue);
      }else{
        result = await runChat(query);
      }
     
      // '**' for bold text
      let rawData = result.split('**');
      let rawDataLenght = rawData.length;
      let convertedRawData = '';

      for(let i = 0; i<rawDataLenght; i++){
        let isNumber = rawData[i].slice(0,1);
          if(i % 2 == 1){
            if(Number(isNumber) == isNumber){
              convertedRawData += `<ul><li><b>${rawData[i].substring(2,rawData.length)}</b></li></ul>`;
            }else{
              convertedRawData += `<b>${rawData[i]}</b>`;
            }
          }
          else convertedRawData += rawData[i];
      }
      
      // '.' for new line \n
      rawData = convertedRawData.split('*').join("</br>").split('.');
      rawDataLenght = rawData.length;
      convertedRawData = '';
      for(let i = 0; i<rawDataLenght; i++){
        let isNumber = rawData[i].slice(rawData[i].length - 1);
        if(i % 2 == 0){
          if(Number(isNumber) == isNumber){
            convertedRawData += `${rawData[i].substring(0,rawData[i].length - 1)} </br> ${isNumber}.  `
          }else{
            convertedRawData += rawData[i] + '.'
          }
        }
        else{
          if(Number(isNumber) == isNumber){
            convertedRawData += `</br>${isNumber} ${rawData[i]}.`;
          }else{
            convertedRawData += `${rawData[i]}.</br>`;
          }
        };
      }
      

      // for '```' to create code section
      rawData = convertedRawData.split('```');
      rawDataLenght = rawData.length;
      convertedRawData = '';

      for(let i = 0; i<rawDataLenght; i++){
          if(i % 2 == 1){
            convertedRawData += `<div class='code-section-container'><div class="icons"><div class="code-icon">&lt;/&gt;</div><div class="copy-code-btn">copy</div></div><div class='code-section'>${rawData[i]}</div></div>`;
          }
          else{
            convertedRawData += rawData[i];
          }

          console.log(convertedRawData);
      }
    
    //final data
    convertedRawData = convertedRawData.split(' ');
    let dataLen = convertedRawData.length;
    
    // for clear previous data
    setResponse('');
    setAnimationLoader(false);
    
    // for typing animation
    for(let i = 0 ; i<dataLen; i++){
      let id = setTimeout(()=>{
        if(!stopSendingResponseRef.current){
          setResponse(prev=> prev + convertedRawData[i] + ' ');
        }
        
        if(i == dataLen - 1){
          setShowPauseBtn(false);
        }
      },i * 100);
      setTimeOutIDsRef.current.push(id);
      setShowPauseBtn(true);
    }  
    
    setGiminiIconAnimate(false);
      
  }
  
  return(
    <geminiContext.Provider value={{onSend,response,setResponse,animationLoader,inputValue,setInputValue,giminiIconAnimate,setGiminiIconAnimate,showPauseBtn,stopSendingResponse}}>
           {probs.children}
        </geminiContext.Provider>
    )
}