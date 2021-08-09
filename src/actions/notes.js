import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/journalAdd';
import { types } from '../types/types';

export const startNewNote = ()=>{
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  }
};

export const startLoadingNotes = (uid)=>{
  return async (dispatch)=>{
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const activeNote = (id, note)=>({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const addNewNote = (id, note)=>({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
});

export const setNotes = (notes)=>({
  type:types.notesLoad,
  payload: notes
});

export const startSaveNote = (note)=>{
  return async(dispatch, getState)=>{
    const {uid} = getState().auth;
    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = {...note};
    delete noteToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch(refreshNote(note));
    Swal.fire('Saved', note.title, 'success');
  }
};

export const refreshNote = (note)=>({
  type: types.notesUpdated,
  payload:note
});

export const startUploadImg = (image)=>{
  return async(dispatch, getState)=>{
    const {active:noteActive} = getState().notes;
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      onBeforeOpen: ()=>{
        Swal.showLoading();
      }
    });
    const { secure_url } = await fileUpload(image);
    noteActive.url = secure_url;
    dispatch(startSaveNote(noteActive));
    Swal.close();
  }
};

export const startDeleteNoteSelected = (id)=>{
  return async(dispatch, getState)=>{
    const {uid} = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id)=>({
  type: types.noteSelectDelete,
  payload: id
});