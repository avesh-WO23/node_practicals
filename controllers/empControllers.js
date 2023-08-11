const employees = require("../models/employees.json");
const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { Person } = require("../models/personSchema");

const emp = path.join(__dirname, "../models/emp.json");

const FILTER_KEYWORDS = [
  "firstName",
  "lastName",
  "hobbies",
  "maritalStatus",
  "birthYear",
  "id",
];

//all employees
const getEmployees = (req, res) => {
  const data = JSON.parse(fs.readFileSync(emp, { encoding: "utf-8" }));
  if (req.params.id) {
    const findIdx = data.findIndex((d) => d.id === req.params.id);
    return findIdx > 0
      ? res.status(200).send(data[findIdx])
      : res.status(404).send("sorry user isn't found!");
  } else if (Object.keys(req.query).length) {
    const queryObj = {};
    Object.entries(req.query).forEach(([key, value]) => {
      if (FILTER_KEYWORDS.includes(key) && value) {
        if (key === "birthYear") {
          queryObj[key] = Number(value);
        } else if (key === "hobbies" && value.length) {
          queryObj[key] = value.split(",");
        } else {
          queryObj[key] = value;
        }
      }
    });
    const filteredData = data.filter((d) => {
      return Object.entries(queryObj).every(([key, value]) => {
        if (key === "hobbies") {
          for (let ele of value) {
            if (d[key].includes(ele) && value.length <= d[key].length) {
              return true;
            }
            return false;
          }
        } else if (typeof value === "string") {
          return d[key].toLowerCase() === value.toLowerCase();
        }
        return d[key] === value;
      });
    });
    return res.status(200).send(filteredData);
  }
  //for all user
  fs.readFile(emp, "utf-8", (err, data) => {
    return err
      ? res.status(500).send("Internal Server Error!")
      : res.status(201).send(JSON.parse(data));
  });
};

//Create employee
const createNewEmployee = (req, res) => {
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).send("Please fill required fields!");
  } else {
    const newEmployee = {
      ...req.body,
      id: uuid(),
    };
    const person = new Person(req.body);
    person.save().then(() => console.log("Created person!"));
    if (!fs.existsSync(emp)) {
      fs.writeFile(emp, JSON.stringify([newEmployee]), "utf-8", (err, data) => {
        return err
          ? res.status(500).send("Internal Server Error!")
          : res.status(201).send("Created!");
      });
    } else {
      fs.readFile(emp, "utf-8", (err, data) => {
        if (err) return res.status(500).send("Internal Server Error!");
        else {
          fs.writeFile(
            emp,
            JSON.stringify([...JSON.parse(data), newEmployee]),
            "utf-8",
            (err, data) => {
              return res.status(201).send("Created!");
            }
          );
        }
      });
    }
  }
};

//Update employee
const updateEmployee = (req, res) => {
  fs.readFile(emp, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error!");
    }
    const empData = [...JSON.parse(data)];
    const findIdx = empData.findIndex((e) => e.id === req.body.id);
    if (findIdx < 0) {
      return res.status(404).send("Sorry cannot find the user!");
    } else {
      empData.splice(findIdx, 1, req.body);
      fs.writeFile(emp, JSON.stringify(empData), "utf-8", (err) => {
        return err
          ? res.status(500).send("Internal Server Error!")
          : res.status(200).send("Update Success!");
      });
    }
  });
};

//Delete the employee
const deleteEmployee = (req, res) => {
  const delUid = req.params.id;
  fs.readFile(emp, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error!");
    } else {
      if (!JSON.parse(data).some((e) => e.id === delUid)) {
        return res.status(404).send("Sorry cannot find the User!");
      }
      const updatedData = JSON.parse(data).filter((d) => d.id !== delUid);
      fs.writeFile(emp, JSON.stringify(updatedData), "utf-8", (err) => {
        return err
          ? res.status(500).send("Internal Server Error!")
          : res.status(200).send("deleted!");
      });
    }
  });
};

module.exports = {
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
};
