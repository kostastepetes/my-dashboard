import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [],
  }),
  actions: {
    addNote(newNote) {
      this.notes.push(newNote)
      this.$patch()
    },
    removeNote(index) {
      this.notes.splice(index,  1)
      this.$patch()
    },
    // Other actions for managing notes
  },
})