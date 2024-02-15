<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h3>Pomodoro Timer</h3>
        <p class="display-4">{{ minutes }}:{{ seconds }}</p>
        <div class="mt-4">
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
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const minutes = ref(25)
    const seconds = ref(0)
    let timer
    const totalTime =  25 *  60 // Total time in seconds

    const progressValue = computed(() => {
      const elapsedTime = (totalTime - ((minutes.value *  60) + seconds.value)) % totalTime
      return (elapsedTime / totalTime) *  100
    })

    const startTimer = () => {
      timer = setInterval(() => {
        if (seconds.value ===  0) {
          if (minutes.value ===  0) {
            clearInterval(timer)
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

    return { minutes, seconds, startTimer, stopTimer, progressValue }
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
</style>