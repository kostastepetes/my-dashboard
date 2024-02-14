<template>
  <div class="container mt-4">
    <div class="row">
      <h3>Kanban Board</h3>
      <div class="col-md-4 px-2">
        <div class="card px-0">
          <div class="card-header px-0">
            <h3>To Do</h3>
          </div>
          <div class="card-body">
            <draggable v-model="kanbanStore.todoTasks" @end="onDragEnd('todo')">
              <template #item="{ element, index }">
                <div :key="element.id" class="card mb-2">
                  <div class="card-body">
                    {{ element.title }}
                    <button @click="removeTask('todo', index)" class="btn btn-danger btn-sm float-right">Remove</button>
                  </div>
                </div>
              </template>
            </draggable>
            <input v-model="newTaskTitle" class="form-control mt-2" placeholder="New task" @keyup.enter="addTask">
            <button @click="addTask" class="btn btn-primary mt-2">Add Task</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 px-2">
        <div class="card px-0">
          <div class="card-header px-0">
            <h3>In Progress</h3>
          </div>
          <div class="card-body">
            <draggable v-model="kanbanStore.inProgressTasks" @end="onDragEnd('in-progress')">
              <template #item="{ element, index }">
                <div :key="element.id" class="card mb-2">
                  <div class="card-body">
                    {{ element.title }}
                    <button @click="removeTask('in-progress', index)" class="btn btn-danger btn-sm float-right">Remove</button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="col-md-4 px-2">
        <div class="card px-0">
          <div class="card-header px-0">
            <h3>Done</h3>
          </div>
          <div class="card-body">
            <draggable v-model="kanbanStore.doneTasks" @end="onDragEnd('done')">
              <template #item="{ element, index }">
                <div :key="element.id" class="card mb-2">
                  <div class="card-body">
                    {{ element.title }}
                    <button @click="removeTask('done', index)" class="btn btn-danger btn-sm float-right">Remove</button>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useKanbanStore } from '../store/kanbanStore'; // Adjust the import path to match your store location
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  setup() {
    const kanbanStore = useKanbanStore();
    const newTaskTitle = ref('');

    const addTask = () => {
      if (newTaskTitle.value) {
        kanbanStore.addTask({
          id: Date.now(), // Use the current timestamp as a simple unique ID
          title: newTaskTitle.value,
          status: 'todo', // Default status is 'todo'
        });
        newTaskTitle.value = '';
      }
    };

    const removeTask = (column, index) => {
      kanbanStore.removeTask(column, index);
    };

    const onDragEnd = (column) => (event) => {
      if (event.to !== event.from) {
        const taskId = event.item.id;
        const newStatus = column === 'todo' ? 'in-progress' : column === 'in-progress' ? 'done' : 'done';
        kanbanStore.updateTaskStatus(taskId, newStatus);
      }
    };

    return {
      kanbanStore,
      newTaskTitle,
      addTask,
      removeTask,
      onDragEnd,
    };
  },
};
</script>

<style scoped>
.card {
  box-shadow:  0  4px  8px rgba(0,  0,  0,  0.1); /* Optional: Add shadow to cards */
}

.card-body {
  padding:  1rem; /* Increase padding inside card body */
}

.card .btn {
  margin-top:  0.5rem; /* Add some space below the buttons */
}
</style>