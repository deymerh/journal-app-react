import React from 'react';
import { useDispatch } from 'react-redux';
import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch( startLogout() );
    console.log('Click fuera!')
  };
  return (
    <aside className="journal__sidebar">
      <div className="jounal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="fas fa-moon"></i>
          <span> Deymer!</span>
        </h3>
        <button
          className="btn"
          onClick={handleLogout} 
          >
          Logout
        </button>
      </div>
      <div className="jounal__new-entry">
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New Entry</p>
      </div>
      <JournalEntries />
    </aside>
  )
}
