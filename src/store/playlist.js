import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistUrl: '',
  }),
  actions: {
    setPlaylistUrl(url) {
      this.playlistUrl = url
    },
  },
})