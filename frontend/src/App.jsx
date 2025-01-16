import { useState } from 'react'
import {Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header';
import Home from './pages/Home';
import PastData from './pages/PastData';
import Graphs from './pages/Graphs';
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (isDarkMode) => {
    setDarkMode(isDarkMode);
  }

  return (
    
    <div className= {`app ${darkMode ? "dark" : ""}`}>
      
      <Header onToggleDarkMode={toggleDarkMode}/>
      
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/past-data' element={<PastData/>}/>
            <Route path='/graphs' element={<Graphs/>}/>
          </Routes>
        </main>
     
    </div>

  )
}

export default App;
