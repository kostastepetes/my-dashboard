<template>
  <div id="app">
    <header>
      <h1>My Dashboard</h1>
    </header>
    <main>
      <div class="container">
        <vue-particles id="tsparticles" :options="particlesConfig" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" />
        <draggable v-model="components" class="row" @start="drag=true" @end="drag=false">
          <template #item="{ element }">
            <div class="col-sm-12 col-md-6">  
              <component :is="element.component" class="glassmorphism border border-dark p-4 rounded"/>
            </div>
          </template>
        </draggable>
      </div>
    </main>
    <footer>
      <hr>
      <p>Created by <a href="https://kostastepetes.netlify.app/" target="_blank">Kostas Tepetes</a> ⚡ © 2024</p>
    </footer>
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
import particlesConfig from "./assets/particles.json";

import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};


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
  background-color: #fd1111;
  color: white;
  text-align: center;
  padding:   20px   0;
  border-bottom: 2px solid white;
}

main {
  padding:   20px;
}

footer {
  position: relative;
}
.glassmorphism {
  border-radius:  10px;
  backdrop-filter: blur(60px);
  box-shadow:  0  8px  32px  0 rgba(31,  38,  135,  0.37);
  border:  1px solid rgba(255,  255,  255,  0.18);
}
</style>