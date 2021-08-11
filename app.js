require("colors");
const {
  inquirerMenu,
  inquirerPause,
  readInput,
  listTasksToDelete,
  confirm,
  displayChecklist,
} = require("./helpers/inquirer");
const { saveFileInDB, readFileInDB } = require("./helpers/handleFile");

const Tasks = require("./models/tasks");

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
        const ids = await displayChecklist(tasks.listArr);
        tasks.toogleCompleted(ids);
        console.log(ids);
        break;
      case "6":
        //Delete task
        const id = await listTasksToDelete(tasks.listArr);
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
