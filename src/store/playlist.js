import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    playlistUrl: localStorage.getItem('spotifyPlaylistUrl') || '',
  }),
  actions: {
    setPlaylistUrl(url) {
      this.playlistUrl = url;
      localStorage.setItem('spotifyPlaylistUrl', url);
    },
  },
});