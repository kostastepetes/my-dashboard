<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3>Spotify Playlist</h3>
        <input v-model="playlistUrl" class="form-control mb-2" placeholder="Enter Spotify playlist URL" />
        <iframe v-if="playlistUrl && playlistData" :src="embeddedPlaylistUrl" class="w-100" frameborder="0" allowtransparency="true" allow="encrypted-media" style="height: 80px!important;"></iframe>
        <ul v-else-if="playlistData" class="list-group">
          <li v-for="track in playlistData.tracks" :key="track.id" class="list-group-item">{{ track.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { usePlaylistStore } from '../store/playlist'

export default defineComponent({
  setup() {
    const playlistUrl = ref('')
    const playlistStore = usePlaylistStore()
    const playlistData = ref(null)

    const embeddedPlaylistUrl = computed(() => {
      if (!playlistUrl.value) return null
      const baseUrl = 'https://open.spotify.com/embed/playlist/'
      const id = playlistUrl.value.split('/').pop()
      return `${baseUrl}${id}`
    })

    const savePlaylistUrl = () => {
      playlistStore.setPlaylistUrl(playlistUrl.value)
      fetchPlaylist() // Fetch the playlist after saving the URL
    }

    const fetchPlaylist = async () => {
      if (playlistUrl.value) {
        try {
          const response = await axios.get(`spotify-api-url/playlist?url=${encodeURIComponent(playlistUrl.value)}`)
          console.log('API Response:', response.data) // Log the API response for debugging
          playlistData.value = response.data
        } catch (error) {
          console.error('Error fetching Spotify playlist:', error)
        }
      }
    }

    onMounted(() => {
      // Retrieve the playlist URL from localStorage when the component is mounted
      const storedPlaylistUrl = playlistStore.playlistUrl
      if (storedPlaylistUrl) {
        playlistUrl.value = storedPlaylistUrl
        fetchPlaylist() // Fetch the playlist if there's a stored URL
      }
    })

    return { playlistUrl, embeddedPlaylistUrl, playlistData, savePlaylistUrl, fetchPlaylist }
  },
})
</script>