<template>
  <div>
    <h3>Favorites</h3>
    <input type="text" v-model="newLink" placeholder="Enter a link...">
    <button @click="addLink">Add Link</button>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <a :href="link" target="_blank">{{ link }}</a>
        <button @click="removeLink(index)">Remove</button>
      </li>
    </ul>
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
