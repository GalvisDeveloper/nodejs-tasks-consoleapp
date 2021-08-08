/**
 * _list:
 * {'uuid-123123-123123-12: {id: 12, desc: 'asd', completedAt: '09/02/2022'} '}
 */

const Task = require("./task");

require("colors");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  loadTasksFromArray = (tasks = []) => {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  };

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  fullList() {
    console.log("\nTasks: \n".yellow);
    this.listArr.forEach((tasks, idx) => {
      const i = `${idx + 1}`.green;
      const { desc, completedAt } = tasks;
      const taskStatus = completedAt ? "Completed".green : "Pendant".red;
      console.log(`${i} ${desc} :: ${taskStatus}`);
    });
  }

  listCompleted(completed = true) {
    let count = 0;
    console.log("\nTasks: \n".yellow);
    this.listArr.forEach((tasks) => {
      const { desc, completedAt } = tasks;
      const taskStatus = completedAt ? "Completed".green : "Pendant".red;
      if (completed) {
        //Display completed
        if (completedAt) {
          count += 1;
          console.log(`${count.toString().green} ${desc} :: ${taskStatus}`);
        }
      } else {
        //Display pendants
        if (!completedAt) {
          count += 1;
          console.log(`${count.toString().green} ${desc} :: ${taskStatus}`);
        }
      }
    });
  }
}

module.exports = Tasks;
