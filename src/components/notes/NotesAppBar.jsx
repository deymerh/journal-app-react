import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadImg } from '../../actions/notes';

export const NotesAppBar = () => {
  const {active:noteActive} = useSelector(state => state.notes)
  const dispatch = useDispatch();
  const inputFileImg = useRef(null);
  const handleSaveNote = ()=>{
    dispatch(startSaveNote(noteActive));
  }
  const handleUploadPicture = () => {
    inputFileImg.current.click();
    console.log('Click');
  };
  const handleFileChange = (e)=>{
    const image = e.target.files[0];
    if (image) {
      dispatch(startUploadImg(image));
    }
  };
  return (
    <div className="notes__appbar">
      <span>28 de Agosto 2021</span>
      <input
        type="file"
        id="fileSelector"
        name="fileSelector"
        style={{display:'none'}}
        onChange={handleFileChange}
        ref={inputFileImg}
      />
      <div>
        <button
          className="btn"
          onClick={handleUploadPicture}
        >
          Picture
        </button>
        <button className="btn"
          onClick={handleSaveNote}
        >
          Save
        </button>
      </div>
    </div>
  )
}
