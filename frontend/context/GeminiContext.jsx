import React, { createContext, useState,useEffect, useRef, useCallback } from "react";
import runChat from "../components/config/geminiApi";
import { faCode, faCopy, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const geminiContext = createContext();

export default function geminiContextProvider(probs){
    const [response , setResponse] = useState("");
    const [animationLoader, setAnimationLoader] = useState(false);
    const [inputValue , setInputValue] = useState('');
    const [prevInputValue , setPrevInputValue] = useState([]);
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
      // for clear previous data
      setResponse('');
      
      stopSendingResponse(true);
      setAnimationLoader(true);
      let result = undefined;
      if(inputValue != ''){
        result = await runChat(inputValue);
        setPrevInputValue(prev=>[...prev,inputValue]);
      }else{
        result = await runChat(query);
        setPrevInputValue(prev=>[...prev,query]);
      }
     
      // '**' for bold text
      let rawData = result.split('**');
      let rawDataLenght = rawData.length;
      let convertedRawData = '';

      for(let i = 0; i<rawDataLenght; i++){
        let isNumber = rawData[i].slice(0,1);
          if(i % 2 == 1){
            if(Number(isNumber) == isNumber){
              convertedRawData += `<ul><li>${rawData[i].substring(0,2)}<b>${rawData[i].substring(2,rawData.length)}</b></li></ul>`;
            }else{
              convertedRawData += `<b>${rawData[i]}</b>`;
            }
          }
          else convertedRawData += rawData[i];
      }
      
      // '.' for new line \n
      rawData = convertedRawData.split('\n').join('</br>').split('*').join('');
      rawDataLenght = rawData.length;
      convertedRawData = rawData;
  
      
      // for '```' to create code section
      rawData = convertedRawData.split('```');
      rawDataLenght = rawData.length;
      convertedRawData = '';

      for(let i = 0; i<rawDataLenght; i++){
          if(i % 2 == 1){
            // get code language type from data
            let language = rawData[i].split('</br>')[0];
            // remove code language type from data to show code on code-section without code language type
            let data = rawData[i].split(language).join('');
            convertedRawData += `<div class='code-section-container'><div class="icons"><div class="code-icon">${language}</div><div class="copy-code-btn">copy</div></div><div class='code-section'>${data}</div></div>`;
          }
          else{
            convertedRawData += rawData[i];
          }
      }
    
    //final data
    convertedRawData = convertedRawData.split(' ');
    let dataLen = convertedRawData.length;
    
    
    setAnimationLoader(false);
    
    // for typing animation
    for(let i = 0 ; i<dataLen; i++){
      let id = setTimeout(()=>{
        if(!stopSendingResponseRef.current){
          setResponse(prev=> prev + convertedRawData[i] + ' ');
        }        
        //if dataLen reached to the last index so pause Btn will be hide;
        if(i == dataLen - 1){
          setShowPauseBtn(false);
        }
      },i * 100);
      setTimeOutIDsRef.current.push(id);
      setShowPauseBtn(true);
    }  

    setGiminiIconAnimate(false);
  }

  // for copy data from code-section
  useEffect(()=>{
    const codeCopyBtnTags = document.querySelectorAll('.copy-code-btn');
    codeCopyBtnTags.forEach(tag=>{
      tag.addEventListener('click',handleCodeCopyBtn);
    })
  },[response]);

  function handleCodeCopyBtn(e){
    const data = e.target.closest('.code-section-container').querySelector('.code-section').innerText;
    window.navigator.clipboard.writeText(data);
    e.target.innerHTML = 'copied! ✔'
    setTimeout(()=>{
     e.target.innerText = 'copy'   
    },2000)
  }

return(
    <geminiContext.Provider value={{onSend,response,setResponse,animationLoader,inputValue,setInputValue,prevInputValue,giminiIconAnimate,setGiminiIconAnimate,showPauseBtn,stopSendingResponse}}>
           {probs.children}
    </geminiContext.Provider>
    )
}