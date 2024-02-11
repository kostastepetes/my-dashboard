<template>
    <div>
      <textarea v-model="currentNote"></textarea>
      <button @click="saveNote">Save</button>
      <div v-for="(note, index) in notes" :key="index" class="saved-note">
        {{ note }}
        <button @click="deleteNote(index)">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useNoteStore } from '../store'
  
  const currentNote = ref('')
  const noteStore = useNoteStore()
  
  const saveNote = () => {
    if (currentNote.value.trim() !== '') {
      noteStore.addNote(currentNote.value.trim())
      currentNote.value = ''
    }
  }
  
  const deleteNote = (index) => {
    noteStore.removeNote(index)
  }
  
  const notes = noteStore.notes
  </script>