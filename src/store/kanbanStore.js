import { defineStore } from 'pinia';

export const useKanbanStore = defineStore({
  id: 'kanban',
  state: () => ({
    todoTasks: JSON.parse(localStorage.getItem('kanbanTodoTasks')) || [],
    inProgressTasks: JSON.parse(localStorage.getItem('kanbanInProgressTasks')) || [],
    doneTasks: JSON.parse(localStorage.getItem('kanbanDoneTasks')) || [],
  }),
  actions: {
    addTask(task) {
      this.todoTasks.push(task);
      this.saveTasksToLocalStorage();
    },
    removeTask(column, index) {
      // Ensure that the column parameter matches the property names in the state
      if (column === 'todo') {
        this.todoTasks.splice(index,  1);
      } else if (column === 'in-progress') {
        this.inProgressTasks.splice(index,  1);
      } else if (column === 'done') {
        this.doneTasks.splice(index,  1);
      }
      this.saveTasksToLocalStorage();
    },
    updateTaskStatus(taskId, newStatus) {
      // Find the task in the appropriate array based on its current status
      let task;
      if (newStatus === 'in-progress') {
        task = this.todoTasks.find(t => t.id === taskId);
        if (task) {
          this.todoTasks = this.todoTasks.filter(t => t.id !== taskId);
          this.inProgressTasks.push(task);
        }
      } else if (newStatus === 'done') {
        task = this.inProgressTasks.find(t => t.id === taskId);
        if (task) {
          this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== taskId);
          this.doneTasks.push(task);
        }
      }
      // No need to handle 'todo' status here since tasks are only moved forward
      if (task) {
        task.status = newStatus;
        this.saveTasksToLocalStorage();
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('kanbanTodoTasks', JSON.stringify(this.todoTasks));
      localStorage.setItem('kanbanInProgressTasks', JSON.stringify(this.inProgressTasks));
      localStorage.setItem('kanbanDoneTasks', JSON.stringify(this.doneTasks));
    },
  },
});