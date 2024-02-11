// store/favorites.js
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    links: [],
  }),
  actions: {
    addLink(newLink) {
      this.links.push(newLink)
      this.$patch()
    },
    removeLink(index) {
      this.links.splice(index, 1)
      this.$patch()
    },
  },
})
