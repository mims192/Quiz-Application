import React from 'react'
import Dashboard from './components/Dashboard'
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from './components/Quiz';
import CreateQuiz from './components/CreateQuiz';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/Create' element={<CreateQuiz/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
