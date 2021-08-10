require("colors");
const {
  inquirerMenu,
  inquirerPause,
  readInput,
  listTasksToDelete,
  confirm,
} = require("./helpers/inquirer");
const { saveFileInDB, readFileInDB } = require("./helpers/handleFile");

const Tasks = require("./models/tasks");

// const { showMenu, pause } = require("./helpers/messages");

// console.clear();

const main = async () => {
  let opt = "";

  const tasks = new Tasks();

  const tasksDB = readFileInDB();

  if (tasksDB) {
    // Put the tasks
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //Create task
        const desc = await readInput("Description: ");
        tasks.createTask(desc);

        break;
      case "2":
        //List tasks
        tasks.fullList();
        // console.log(tasks.listArr);
        break;
      case "3":
        //List completed task
        tasks.listCompleted(true);
        break;
      case "4":
        //List pendant task
        tasks.listCompleted(false);
        break;
      case "5":
        //Complete task
        break;
      case "6":
        //Delete task
        const id = await listTasksToDelete(tasks.listArr);
        //TODO: ask if the user is aware of the removal
        if (id !== "0") {
          const ok = await confirm("Are you sure of it?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("\nTask Deleted");
          }
        }
        break;
      case "0":
        //Close
        break;
      default:
        break;
    }

    saveFileInDB(tasks.listArr);

    await inquirerPause();
  } while (opt !== "0");
};

main();

// do { } ---> tests
// const task = new Task("Buy food");

// tasks._list[task.id] = task;

// console.log(tasks);
// if (opt !== "0") await pause();
