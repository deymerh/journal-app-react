import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const {name} = useSelector(state => state.auth);
  const handleLogout = ()=>{
    dispatch(startLogout());
  };
  const handleAddNew = ()=>{
    dispatch(startNewNote());
  }
 return (
    <aside className="journal__sidebar">
      <div className="jounal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="fas fa-moon"></i>
          <span>{name}!</span>
        </h3>
        <button
          className="btn"
          onClick={handleLogout} 
          >
          Logout
        </button>
      </div>
      <div className="jounal__new-entry">
        <i className="far fa-calendar-plus fa-5x"
          onClick={handleAddNew}
        ></i>
        <p className="mt-5">New Entry</p>
      </div>
      <JournalEntries />
    </aside>
  )
}
