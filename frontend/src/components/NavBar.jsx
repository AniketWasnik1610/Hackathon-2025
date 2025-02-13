import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full px-10 py-4 flex items-center justify-between backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg shadow-cyan-500/20 rounded-b-lg">
      <Link to="/" className="text-lg font-medium hover:text-indigo-600 transition duration-300 relative group border-none">
        Home
        <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
      </Link>

      <Link to="/" className="tracking-widest text-cyan-600 text-3xl font-bold drop-shadow-lg hover:text-cyan-700 transition duration-300">
        DataFlowX
      </Link>

      <Link to="/history" className="text-lg font-medium hover:text-indigo-600 transition duration-300 relative group">
        History
        <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </div>

  )
}

export default NavBar;