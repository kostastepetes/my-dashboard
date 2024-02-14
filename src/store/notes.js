import { defineStore } from 'pinia';

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes')) || [],
  }),
  actions: {
    addNote(newNote) {
      this.notes.push(newNote);
      this.saveNotesToLocalStorage();
    },
    removeNote(index) {
      this.notes.splice(index,  1);
      this.saveNotesToLocalStorage();
    },
    saveNotesToLocalStorage() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    // Other actions for managing notes
  },
});