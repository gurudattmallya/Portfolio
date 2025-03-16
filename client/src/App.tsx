import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Portfolio from './pages/Portfolio';

function App() {

  return (
    <>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </>
  )
}

export default App
