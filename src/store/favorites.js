import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    links: JSON.parse(localStorage.getItem('favoritesLinks')) || [],
  }),
  actions: {
    addLink(newLink) {
      this.links.push(newLink);
      this.saveLinksToLocalStorage();
    },
    removeLink(index) {
      this.links.splice(index,  1);
      this.saveLinksToLocalStorage();
    },
    saveLinksToLocalStorage() {
      localStorage.setItem('favoritesLinks', JSON.stringify(this.links));
    },
    // Other actions for managing favorites
  },
});