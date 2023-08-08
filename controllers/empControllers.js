const employees = require("../models/employees.json");
const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const emp = path.join(__dirname, "../models/emp.json");

//all employees
const getEmployees = (req, res) => {
  const data = JSON.parse(fs.readFileSync(emp, { encoding: "utf-8" }));
  if (req.params.id) {
    const findIdx = data.findIndex((d) => d.id === req.params.id);
    return findIdx > 0
      ? res.status(201).send(data[findIdx])
      : res.status(404).send("sorry user isn't found!");
  } else if (Object.keys(req.query).length) {
    const filteredData = data.filter((d) =>
      Object.entries(req.query).every(([key, value]) =>
        key && value ? d[key] === value : true
      )
    );
    return filteredData.length
      ? res.status(201).send(filteredData)
      : data.every((d) => Object.keys(req.query).every((q) => q in d)) //in is like hasOwnProperty of object d.hasOwnProperty(q)
      ? res.send(filteredData)
      : res.send(
          data.filter((d) =>
            Object.entries(req.query).some(([key, value]) => d[key] === value)
          )
        );
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
  if (!req.body.id || !req.body.firstName || !req.body.lastName) {
    return res.status(404).send("All fields are Required!");
  } else {
    fs.readFile(emp, "utf-8", (err, data) => {
      const empData = [...JSON.parse(data)];
      const findIdx = empData.findIndex((e) => e.id === req.body.id);
      if (findIdx < 0) {
        return res.status(404).send("Sorry cannot find the user!");
      } else {
        empData[findIdx].firstName = req.body.firstName;
        empData[findIdx].lastName = req.body.lastName;
        empData.splice(findIdx, 1, empData[findIdx]);
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
// const getEmployee = (req, res) => {
//   const empId = req.params.id;
//   if (!empId) {
//     return res.status(404).send("Invalid user!");
//   }
//   fs.readFile(emp, "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Internal Server Error!");
//     }
//     const getEmp = JSON.parse(data).find((d) => d.id === empId);
//     return getEmp
//       ? res.status(201).send(getEmp)
//       : res.status(404).send("cannot find the user!");
//   });
// };

module.exports = {
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
};
