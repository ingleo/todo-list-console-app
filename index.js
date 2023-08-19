require("colors");

const { readDB, saveDB } = require("./utilities/storeDbFile");
const {
  inquirerMenu,
  pause,
  readInput,
  showChecklist,
  listTasksToDelete,
  confirmDeletion,
} = require("./helpers/inquirer");

const List = require("./models/list");

const main = async () => {
  let opt = "";
  const list = new List();
  const tasksDB = readDB();

  if (tasksDB) {
    list.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description");
        list.createTask(desc);
        break;
      case "2":
        list.fullList();
        break;
      case "3":
        list.listCompletedPendingTasks(true);
        break;
      case "4":
        list.listCompletedPendingTasks(false);
        break;
      case "5":
        const ids = await showChecklist(list.arrayList);
        list.toggleCompleted(ids);
        break;
      case "6":
        const id = await listTasksToDelete(list.arrayList);
        if (id !== "0") {
          const ok = await confirmDeletion("Are you sure?");
          list.deleteTask(id);
          console.log("Task deleted successfully");
        }
        break;
    }
    saveDB(list.arrayList);
    await pause();
  } while (opt !== "0");
};

main();
