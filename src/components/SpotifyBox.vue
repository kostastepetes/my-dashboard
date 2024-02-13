<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3>Spotify Playlist</h3>
        <input v-model="playlistUrl" class="form-control mb-2" placeholder="Enter Spotify playlist URL" />
        <iframe v-if="playlistUrl" :src="embeddedPlaylistUrl" class="w-100 h-auto" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <ul v-else class="list-group">
          <li v-for="track in tracks" :key="track.id" class="list-group-item">{{ track.name }}</li>
        </ul>
      </div>
    </div>
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
  