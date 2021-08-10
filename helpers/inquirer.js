const inquirer = require("inquirer");

require("colors");

/**
 * Menu Options
 */
const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What you wish to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create task`,
      },
      {
        value: "2",
        name: `${"2.".green} List tasks`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed task`,
      },
      {
        value: "4",
        name: `${"4.".green} List pendant task`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete task`,
      },
      {
        value: "0",
        name: `${"0.".green} Close`,
      },
    ],
  },
];

/**
 * Menu Options displayed once u run the app for the first time, thanks to inquirer
 */
const inquirerMenu = async (req, res) => {
  console.clear();
  console.log("=====================".green);
  console.log("   Choose an Option  ".cyan);
  console.log("=====================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

/**
 * Wait for the user action in the menu option, to take control of it
 */
const inquirerPause = async (req, res) => {
  const pauseEvt = [
    {
      type: "input",
      name: "pause",
      message: `Press ${"ENTER".yellow} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(pauseEvt);
};

/**
 * Method that allows the user to type or move through menu with keyboard
 */
const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) "Please enter a value";
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

/**
 * Method that prints whole tasks to be selected for deletion
 */
const listTasksToDelete = async (tasks = []) => {
  const choices = tasks.map((task, idx) => {
    const i = `${idx + 1}.`.green;
    return {
      value: task.id,
      name: `${i} ${task.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);

  return id;
};

/**
 * Handle confirmation method
 */
const confirm = async (message) => {
  const question = [
    {
      type: "confirm", // return a boolean
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  listTasksToDelete,
  confirm,
};
