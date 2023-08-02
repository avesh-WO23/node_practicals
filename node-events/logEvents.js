const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

//Custom Log events
// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

const customLogEvent = async (msg) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${msg}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLogs.txt"),
      `${logItem}\n`
    );
  } catch (error) {
    if (error) throw error;
  }
};

module.exports = { customLogEvent };
