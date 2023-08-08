const employees = require("../models/employees.json");
const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const emp = path.join(__dirname, "../models/emp.json");

//all employees
const getAllEmployees = (req, res) => {
  fs.readFile(emp, "utf-8", (err, data) => {
    return err
      ? res.status(500).send("Internal Server Error!")
      : res.status(201).send(JSON.parse(data));
  });
};

//Create employee
const createNewEmployee = (req, res) => {
  let empData = [];
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).send("Please fill required fields!");
  } else {
    const newEmployee = {
      ...req.body,
      id: uuid(),
    };
    empData.push(newEmployee);
    if (!fs.existsSync(emp)) {
      fs.writeFile(emp, JSON.stringify(empData), "utf-8", (err, data) => {
        return err
          ? res.status(500).send("Internal Server Error!")
          : res.status(201).send("Created!");
      });
    } else {
      fs.readFile(emp, "utf-8", (err, data) => {
        if (err) return res.status(500).send("Internal Server Error!");
        else {
          empData = [...JSON.parse(data), newEmployee];
          fs.writeFile(emp, JSON.stringify(empData), "utf-8", (err, data) => {
            return res.status(201).send("Created!");
          });
        }
      });
    }
  }
};

//Update employee
const updateEmployee = (req, res) => {
  if (!req.body.id || !req.body.firstName || !req.body.lastName) {
    return res.status(404).send("All fields are Required!");
  } else {
    fs.readFile(emp, "utf-8", (err, data) => {
      const empData = [...JSON.parse(data)];
      const findUser = empData.find((e) => e.id === req.body.id);
      const findIdx = empData.findIndex((e) => e.id === req.body.id);
      if (!findUser) {
        return res.status(404).send("Sorry cannot find the user!");
      } else {
        findUser.firstName = req.body.firstName;
        findUser.lastName = req.body.lastName;
        empData.splice(findIdx, 1, findUser);
        fs.writeFile(emp, JSON.stringify(empData), "utf-8", (err) => {
          return err
            ? res.status(500).send("Internal Server Error!")
            : res.status(201).send("Update Success!");
        });
      }
    });
  }
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
          : res.status(201).send("deleted!");
      });
    }
  });
};

//get single employee
const getEmployee = (req, res) => {
  const empId = req.params.id;
  if (!empId) {
    return res.status(404).send("Invalid user!");
  }
  fs.readFile(emp, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Internal Server Error!");
    }
    const getEmp = JSON.parse(data).find((d) => d.id === empId);
    return getEmp
      ? res.status(201).send(getEmp)
      : res.status(404).send("cannot find the user!");
  });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
