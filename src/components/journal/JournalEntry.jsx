import React from 'react';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({id, date, title, body, url}) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleActivatedNote = ()=>{
    dispatch(activeNote(id, {date, title, body, url}));
  };
  return (
    <div className="journal__entry animate__animated animate__fadeIn animated__fater"
      onClick={handleActivatedNote}
      data-testid="selectNote"    
    >
      {
        (url)&&  
          <img
            className="journal__entry-picture"
            src={url}
            style={{
              backgroundSize: 'cover'
          }}
          alt="note"
        />
      }
      <div className="jornal__entry-body">
        <p className="jornal__entry-title">{title}</p>
        <p className="jornal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  )
}
