<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <h3>Notes</h3>
        <textarea v-model="currentNote" class="form-control mb-2"></textarea>
        <button @click="saveNote" class="btn btn-primary mb-2">Save</button>
        <div v-for="(note, index) in notes" :key="index" class="card mb-2">
          <div class="card-body">
            {{ note }}
            <button @click="deleteNote(index)" class="btn btn-danger float-right">Delete</button>
          </div>
        </div>
      </div>
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