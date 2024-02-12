<template>
  <div>
    <h3>Spotify Playlist</h3>
    <input v-model="playlistUrl" placeholder="Enter Spotify playlist URL" />
    <iframe v-if="playlistUrl" :src="embeddedPlaylistUrl" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    <ul v-else>
      <li v-for="track in tracks" :key="track.id">{{ track.name }}</li>
    </ul>
  </div>
</template>
  
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { usePlaylistStore } from '../store'

export default defineComponent({
  setup() {
    const playlistUrl = ref('')
    const playlistStore = usePlaylistStore()
    const tracks = ref([])

    const embeddedPlaylistUrl = computed(() => {
      if (!playlistUrl.value) return null
      const baseUrl = 'https://open.spotify.com/embed/playlist/'
      const id = playlistUrl.value.split('/').pop()
      return `${baseUrl}${id}`
    })

    onMounted(async () => {
      if (playlistUrl.value) {
        try {
          const response = await axios.get(`spotify-api-url/playlist?url=${encodeURIComponent(playlistUrl.value)}`)
          tracks.value = response.data.tracks
        } catch (error) {
          console.error('Error fetching Spotify playlist:', error)
        }
      }
    })

    return { playlistUrl, embeddedPlaylistUrl, tracks }
  },
})
</script>
  