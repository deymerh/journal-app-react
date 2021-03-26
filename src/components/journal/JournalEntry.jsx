import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://static8.depositphotos.com/1033604/883/i/950/depositphotos_8831337-stock-photo-fascinating-springtime-scenery.jpg)'
        }}
      ></div>
      <div className="jornal__entry-body">
        <p className="jornal__entry-title">Un nuevo día</p>
        <p className="jornal__entry-content">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
