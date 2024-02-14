import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: JSON.parse(localStorage.getItem('events')) || [],
  }),
  actions: {
    addEvent(event) {
      this.events.push(event);
      this.saveEventsToLocalStorage();
    },
    removeEvent(index) {
      this.events.splice(index,   1);
      this.saveEventsToLocalStorage();
    },
    saveEventsToLocalStorage() {
      localStorage.setItem('events', JSON.stringify(this.events));
    },
  },
});