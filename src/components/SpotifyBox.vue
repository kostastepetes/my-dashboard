<template>
    <div>
      <h3>Spotify Playlist</h3>
      <ul>
        <li v-for="track in tracks" :key="track.id">{{ track.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  
  export default defineComponent({
    setup() {
      const tracks = ref([])
  
      onMounted(async () => {
        try {
          const response = await axios.get('spotify-api-url/playlist')
          tracks.value = response.data.tracks
        } catch (error) {
          console.error('Error fetching Spotify playlist:', error)
        }
      })
  
      return { tracks }
    },
  })
  </script>
  