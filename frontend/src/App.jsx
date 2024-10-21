import React from 'react'
import { useState } from 'react'
import './App.css'
import { Main , Sidebar} from '../components/index'
import { geminiContext } from '../context/GeminiContext'
import GeminiContextProvider from '../context/GeminiContext'
import runChat from '../components/config/geminiApi'
function App() {
  return (
    <GeminiContextProvider>   
         <Sidebar/>
         <Main/>
    </GeminiContextProvider>
  )
}

export default App