<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h3>Calendar</h3>
        <DatePicker v-model="selectedDate" class="mb-3" :is-dark="true"/>
        <form @submit.prevent="addEvent" class="mb-3">
          <div class="input-group">
            <input v-model="newEvent.title" placeholder="Event title" required class="form-control" />
            <button type="submit" class="btn btn-primary">Add Event</button>
          </div>
        </form>
        <ul class="list-group">
          <li v-for="(event, index) in events" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            {{ event.title }} - {{ event.date }}
            <button @click="removeEvent(index)" class="btn btn-danger btn-sm">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useEventsStore } from '../store/eventsStore';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const eventsStore = useEventsStore();
const newEvent = ref({ title: '', date: '' });
const selectedDate = ref(new Date());

const addEvent = () => {
  if (newEvent.value.title) {
    eventsStore.addEvent({
      ...newEvent.value,
      date: selectedDate.value,
      dot: true,
    });
    newEvent.value = { title: '', date: '' };
    selectedDate.value = new Date(); // Reset the date picker
  }
};

const removeEvent = (index) => {
  eventsStore.removeEvent(index);
};

const events = eventsStore.events;
</script>


<style scoped>
.vc-title-wrapper .vc-title span {
color: white!important;
}
</style>