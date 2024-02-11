<template>
    <div>
      <p>{{ minutes }}:{{ seconds }}</p>
      <button @click="startTimer">Start</button>
      <button @click="stopTimer">Stop</button>
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