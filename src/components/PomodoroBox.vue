<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h3>⌛ Pomodoro Timer</h3>
        <p class="display-4">{{ minutes }}:{{ seconds }}</p>
        <div class="mt-4">
          <input type="range" min="0" max="60" v-model="timerTime" class="slider" id="myRange">
          <label for="myRange">{{ timerTime }} minutes</label>
          <button @click="startTimer" class="btn btn-primary mr-2">Start</button>
          <button @click="stopTimer" class="btn btn-secondary">Stop</button>
        </div>
        <div class="mt-4">
          <progress max="100" :value="progressValue" class="w-100"></progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  setup() {
    const timerTime = ref(25) // New reactive variable for timer time
    const minutes = ref(timerTime.value) // Use the timerTime value as the initial minutes
    const seconds = ref(0)
    let timer

    const totalTime = computed(() => timerTime.value *  60) // Total time in seconds based on timerTime

    const progressValue = computed(() => {
      const elapsedTime = (totalTime.value - ((minutes.value *  60) + seconds.value)) % totalTime.value
      return (elapsedTime / totalTime.value) *  100
    })

    const startTimer = () => {
      timer = setInterval(() => {
        if (seconds.value ===  0) {
          if (minutes.value ===  0) {
            clearInterval(timer)
            alert("Time's up! Take a break") // Show alert when time runs out
            return
          }
          minutes.value--
          seconds.value =  59
        } else {
          seconds.value--
        }
      },  1000)
    }

    const stopTimer = () => {
      clearInterval(timer)
    }

    // Watch for changes in timerTime and update minutes accordingly
    watch(timerTime, (newTime) => {
      minutes.value = newTime
      seconds.value =  0
    })

    return { minutes, seconds, startTimer, stopTimer, progressValue, timerTime }
  },
})
</script>

<style scoped>
/* Style the progress bar */
progress {
  appearance: none;
  height:  20px;
  border: none;
  background-color: #eee;
}

progress::-webkit-progress-bar {
  background-color: #eee;
}

progress::-webkit-progress-value {
  background-color: #007bff;
}

progress::-moz-progress-bar {
  background-color: #007bff;
}

/* Style the slider */
.slider {
  -webkit-appearance: none;
  width:  100%;
  height:  15px;
  border-radius:  5px;
  background: #d3d3d3;
  outline: none;
  opacity:  0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity:  1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width:  25px;
  height:  25px;
  border-radius:  50%;
  background: #bb2d3b;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width:  25px;
  height:  25px;
  border-radius:  50%;
  background: #bb2d3b;
  cursor: pointer;
}
</style>