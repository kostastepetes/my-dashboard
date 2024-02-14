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
      const task = this.todoTasks.find(task => task.id === taskId);
      if (task) {
        task.status = newStatus;
        this.saveTasksToLocalStorage();
      }
      // Move the task to the appropriate array based on the new status
      if (newStatus === 'in-progress') {
        this.inProgressTasks.push(task);
        this.todoTasks = this.todoTasks.filter(t => t.id !== taskId);
      } else if (newStatus === 'done') {
        this.doneTasks.push(task);
        this.todoTasks = this.todoTasks.filter(t => t.id !== taskId);
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('kanbanTodoTasks', JSON.stringify(this.todoTasks));
      localStorage.setItem('kanbanInProgressTasks', JSON.stringify(this.inProgressTasks));
      localStorage.setItem('kanbanDoneTasks', JSON.stringify(this.doneTasks));
    },
  },
});