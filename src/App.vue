<template>
  <div id="app">
    <header>
      <h1>My Dashboard</h1>
    </header>
    <main>
      <div class="container">
        <draggable v-model="components" class="row" @start="drag=true" @end="drag=false">
          <template #item="{ element }">
            <div class="col-sm-12 col-md-6"> 
              <component :is="element.component" class="border border-dark p-4 rounded"/>
            </div>
          </template>
        </draggable>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import NoteBox from './components/NoteBox.vue'
import FavoritesBox from './components/FavoritesBox.vue'
import KanbanBox from './components/KanbanBox.vue'
import CalendarBox from './components/CalendarBox.vue'
import PomodoroBox from './components/PomodoroBox.vue'
import SpotifyBox from './components/SpotifyBox.vue'

const components = ref([
  { name: 'NoteBox', component: NoteBox },
  { name: 'FavoritesBox', component: FavoritesBox },
  { name: 'KanbanBox', component: KanbanBox },
  { name: 'CalendarBox', component: CalendarBox },
  { name: 'PomodoroBox', component: PomodoroBox },
  { name: 'SpotifyBox', component: SpotifyBox }
])
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
  padding:   20px   0;
}

main {
  padding:   20px;
}
</style>