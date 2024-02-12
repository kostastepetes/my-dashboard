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
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    setup() {
      const minutes = ref(25)
      const seconds = ref(0)
      let timer
  
      const startTimer = () => {
        timer = setInterval(() => {
          if (seconds.value === 0) {
            if (minutes.value === 0) {
              clearInterval(timer)
              return
            }
            minutes.value--
            seconds.value = 59
          } else {
            seconds.value--
          }
        }, 1000)
      }
  
      const stopTimer = () => {
        clearInterval(timer)
      }
  
      return { minutes, seconds, startTimer, stopTimer }
    },
  })
  </script>