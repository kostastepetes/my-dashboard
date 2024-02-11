<template>
  <div id="app">
    <header>
      <h1>My Dashboard</h1>
    </header>
    <main>
      <div class="grid-container">
        <!-- Dashboard boxes -->
        <NoteBox />
        <PomodoroBox />
        <CalendarBox />
        <SpotifyBox />
        <WeatherBox />
        <KanbanBox />
        <FavoritesBox />
      </div>
    </main>
  </div>
</template>

<script setup>
import NoteBox from './components/NoteBox.vue'
import PomodoroBox from './components/PomodoroBox.vue'
import CalendarBox from './components/CalendarBox.vue'
import SpotifyBox from './components/SpotifyBox.vue'
import WeatherBox from './components/WeatherBox.vue'
import KanbanBox from './components/KanbanBox.vue'
import FavoritesBox from './components/FavoritesBox.vue'
</script>

<style scoped>
/* Add your global styles here */
#app {
  font-family: Arial, sans-serif;
}

header {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px 0;
}

main {
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px; /* Changed grid-gap to gap */
}
</style>
