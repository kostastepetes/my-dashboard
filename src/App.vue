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
import KanbanBox from './components/KanbanBox.vue'
import PomodoroBox from './components/PomodoroBox.vue'
import CalendarBox from './components/CalendarBox.vue'
import SpotifyBox from './components/SpotifyBox.vue'
import FavoritesBox from './components/FavoritesBox.vue'

const components = ref([
  { name: 'NoteBox', component: NoteBox },
  { name: 'KanbanBox', component: KanbanBox },
  { name: 'PomodoroBox', component: PomodoroBox },
  { name: 'CalendarBox', component: CalendarBox },
  { name: 'SpotifyBox', component: SpotifyBox },
  { name: 'FavoritesBox', component: FavoritesBox }
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