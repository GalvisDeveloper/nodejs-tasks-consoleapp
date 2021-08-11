/**
 * Object example
 * _list:
 * {'uuid-123123-123123-12: {id: 12, desc: 'asd', completedAt: '09/02/2022'} '}
 */

const Task = require("./task");

require("colors");

class Tasks {
  _list = {};

  /**
   * Getter Method
   */
  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  /**
   * Class constructor
   */
  constructor() {
    this._list = {};
  }

  /**
   * Load tasks from an array
   */
  loadTasksFromArray = (tasks = []) => {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  };

  /**
   * Create task method
   */
  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  /**
   * Delete task method
   */
  deleteTask(id = "") {
    if (this._list[id]) delete this._list[id];
  }

  /**
   * Get full list of tasks method
   */
  fullList() {
    console.log("\nTasks: \n".yellow);
    this.listArr.forEach((tasks, idx) => {
      const i = `${idx + 1}`.green;
      const { desc, completedAt } = tasks;
      const taskStatus = completedAt ? "Completed".green : "Pendant".red;
      console.log(`${i} ${desc} :: ${taskStatus}`);
    });
  }

  /**
   * Get list of tasks that have been completed or are pending to
   */
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
          console.log(`${(count + ".").green} ${desc} :: ${completedAt.green}`);
        }
      } else {
        //Display pendants
        if (!completedAt) {
          count += 1;
          console.log(`${(count + ".").green} ${desc} :: ${taskStatus}`);
        }
      }
    });
  }

  /**
   * Method that allows mark a task as completed or pendant in a group
   */
  toogleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
