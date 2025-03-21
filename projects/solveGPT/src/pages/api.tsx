import { getForm, post, postForm } from "../utils/utils";

export const getNoteKinds = (p: any = {}) => post("/get_note_kinds", p);

export const getNotes = (p: any = {}) => post("/get_notes", p);
export const getOCR = (p: any = {}) => post("/get_ocr", p);
export const answerGPT = (p: any = {}) => post("/openAI", p);
export const addNoteKind = (p: any = {}) => post("/add_note_kind", p);
export const addNote = (p: any = {}) => post("/add_note", p);
export const getAll = (p: any = {}) => getForm("/getAll", p);
export const deleteNote = (p: any = {}) => post("/delete_note", p);
export const deleteNoteKind = (p: any = {}) => post("/delete_note_kind", p);
