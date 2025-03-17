import { Routes, Route } from 'react-router-dom';
import './App.css';
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
