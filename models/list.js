const Task = require("./task");

class List {
  items = {};

  constructor() {
    this.items = {};
  }

  get arrayList() {
    const list = [];

    Object.keys(this.items).forEach((key) => {
      const task = this.items[key];
      list.push(task);
    });

    return list;
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this.items[task.id] = task;
    });
  }

  createTask(description = "") {
    const task = new Task(description);
    this.items[task.id] = task;
  }

  fullList() {
    console.log();
    this.arrayList.forEach((task, i) => {
      const idx = `${i + 1}`.green;
      const { description, completedIn } = task;
      const state = completedIn ? "Completed".green : "Pending".red;

      console.log(`${idx} ${description} :: ${state}`);
    });
  }

  listCompletedPendingTasks(completed) {
    console.log();
    const tasksArray = this.arrayList.filter((task) => {
      let isCompleted = task.completedIn !== null ? true : false;
      return isCompleted === completed;
    });

    tasksArray.forEach((task, i) => {
      const idx = `${i + 1}`.green;
      const { description, completedIn } = task;
      const state = completedIn ? `${completedIn}`.green : "Pending".red;

      console.log(`${idx} ${description} :: ${state}`);
    });
  }

  deleteTask(id = "") {
    if (this.items[id]) {
      delete this.items[id];
    }
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this.items[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.arrayList.forEach((task) => {
      if (!ids.includes(task.id)) {
        this.items[task.id].completedIn = null;
      }
    });
  }
}

module.exports = List;
