import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleteNoteSelected } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const {active:noteActive} = useSelector(state => state.notes);
  const dispatch = useDispatch();
  const [values, handleInputChange, reset] = useForm(noteActive);
  const {title, body} =  values;
  const activeNotedId =  useRef(noteActive.id);
  useEffect(() => {
    if (noteActive.id !== activeNotedId.current) {
      reset(noteActive);
      activeNotedId.current = noteActive.id;
    }
  }, [noteActive, reset]);
  useEffect(() => {
    dispatch(activeNote(noteActive.id, {...values}))
  }, [values, dispatch]);
  const handleDelete = ()=>{
    dispatch(startDeleteNoteSelected(noteActive.id));
  };
  return (
    <div className="notes__main-content animate__animated animate__fadeIn animated__fater">
      <NotesAppBar />
      <div className="notes__content">
        <input
          name="title"
          value={title}
          type="text"
          id=""
          placeholder="Some awesome title"
          className="notes__title-input"
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          value={body}
          id=""
          cols="30"
          rows="10"
          placeholder="what happened today"
          className="notes__textarea"
          onChange={handleInputChange}
        >
        </textarea>
        {
          (noteActive.url) &&
            (
              <div className="notes__image">
                <img src={noteActive.url} alt="Imagen" />
              </div>
            )
        }
      </div>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
