<template>
  <div>
    <h3>Weather</h3>
    <p>{{ weather }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const weather = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('weather-api-url')
    weather.value = response.data.weather
  } catch (error) {
    console.error('Error fetching weather:', error)
  }
})
</script>
