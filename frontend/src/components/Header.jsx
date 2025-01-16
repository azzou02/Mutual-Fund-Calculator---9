import React from 'react'
import Navbar from './Navbar'

const Header = ({ darkMode,onToggleDarkMode }) => {
  return (
    <header className='header'>
        <h1>Mutual Fund Calculator</h1>
    <Navbar onToggleDarkMode={onToggleDarkMode} darkMode={darkMode}/>
        </header>
  );
}

export default Header;
