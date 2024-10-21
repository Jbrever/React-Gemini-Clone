import React, { createContext, useState,useEffect, useRef } from "react";
import runChat from "../components/config/geminiApi";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
      let rawData = result.split('**')
      let rawDataLenght = rawData.length;
      let convertedRawData = '';

      for(let i = 0; i<rawDataLenght; i++){
          if(i % 2 == 1){
              convertedRawData += `<b>${rawData[i]}</b>`;
          }
          else convertedRawData += rawData[i];
      }
      
      // '*' for new line \n
      rawData = convertedRawData.split('*').join("</br>").split('.').join("</br>");
      convertedRawData = rawData.split(' ');
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