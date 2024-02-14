<template>
  <div class="kanban-board">
    <div class="kanban-column">
      <h3>To Do</h3>
      <draggable v-model="kanbanStore.todoTasks" @end="onDragEnd('todo')">
        <template #item="{ element, index }">
          <div :key="element.id" class="kanban-task">
            {{ element.title }}
            <button @click="removeTask('todo', index)">Remove</button>
          </div>
        </template>
      </draggable>
      <input v-model="newTaskTitle" placeholder="New task" @keyup.enter="addTask">
      <button @click="addTask">Add Task</button>
    </div>
    <div class="kanban-column">
      <h3>In Progress</h3>
      <draggable v-model="kanbanStore.inProgressTasks" @end="onDragEnd('in-progress')">
        <template #item="{ element, index }">
          <div :key="element.id" class="kanban-task">
            {{ element.title }}
            <button @click="removeTask('in-progress', index)">Remove</button>
          </div>
        </template>
      </draggable>
    </div>
    <div class="kanban-column">
      <h3>Done</h3>
      <draggable v-model="kanbanStore.doneTasks" @end="onDragEnd('done')">
        <template #item="{ element, index }">
          <div :key="element.id" class="kanban-task">
            {{ element.title }}
            <button @click="removeTask('done', index)">Remove</button>
          </div>
        </template>
      </draggable>
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
.kanban-board {
  display: flex;
  justify-content: space-around;
}

.kanban-column {
  border:   1px solid #ccc;
  padding:   10px;
  width:   30%;
}

.kanban-task {
  margin-bottom:   10px;
  padding:   10px;
  border:   1px solid #ccc;
}
</style>