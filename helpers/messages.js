require("colors");

const showMenu = () => {
  return new Promise((res) => {
    console.clear();
    console.log("=====================".green);
    console.log("   Choose an Option  ".cyan);
    console.log("=====================\n".green);

    console.log(`${"1".green}. Create task`);
    console.log(`${"2".green}. List tasks`);
    console.log(`${"3".green}. List completed task`);
    console.log(`${"4".green}. List pendant task`);
    console.log(`${"5".green}. Complete task`);
    console.log(`${"6".green}. Delete task`);
    console.log(`${"7".green}. Close`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Choose an Option: ", (opt) => {
      readLine.close();
      res(opt);
    });
  });
};

const pause = () => {
  return new Promise((res, rej) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`Press ${"ENTER".yellow} to continue`, () => {
      readLine.close();
      res();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
