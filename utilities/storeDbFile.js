const fs = require("fs");

const dbFile = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(dbFile, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(dbFile)) {
    return null;
  }

  const info = fs.readFileSync(dbFile, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  saveDB,
  readDB,
};
