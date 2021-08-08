const inquirer = require("inquirer");

require("colors");

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

const inquirerMenu = async (req, res) => {
  console.clear();
  console.log("=====================".green);
  console.log("   Choose an Option  ".cyan);
  console.log("=====================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

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

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
};
