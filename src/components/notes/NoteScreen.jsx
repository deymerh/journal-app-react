import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          name=""
          id=""
          placeholder="Some awesome title"
          className="notes__title-input"
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="what happened today"
          className="notes__textarea"
        >
        </textarea>
        <div className="notes__image">
          <img src="https://mott.pe/noticias/wp-content/uploads/2019/03/los-50-paisajes-maravillosos-del-mundo-para-tomar-fotos-1280x720.jpg" alt="Imagen" />
        </div>
      </div>
    </div>
  )
}
