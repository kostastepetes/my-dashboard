<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3>Favorites</h3>
        <input type="text" v-model="newLink" class="form-control mb-2" placeholder="Enter a link...">
        <button @click="addLink" class="btn btn-primary mb-2">Add Link</button>
        <ul class="list-group">
          <li v-for="(link, index) in links" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            <a :href="link" target="_blank" class="text-decoration-none">{{ link }}</a>
            <button @click="removeLink(index)" class="btn btn-danger">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFavoritesStore } from '../store'

const newLink = ref('')
const favoritesStore = useFavoritesStore()

const addLink = () => {
  if (newLink.value.trim() !== '') {
    favoritesStore.addLink(newLink.value.trim())
    newLink.value = ''
  }
}

const removeLink = (index) => {
  favoritesStore.removeLink(index)
}

const links = favoritesStore.links
</script>
