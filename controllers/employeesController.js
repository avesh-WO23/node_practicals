const data = {
  employees: require("../models/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

//all employees
const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

//new Employee
const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1]?.id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).send("Please fill required fields");
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

//Update employee
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  const employeeIdx = data.employees.findIndex(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res.status(404).send("Sorry User is not found!");
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  data.employees.splice(employeeIdx, 1, employee);
  data.setEmployees(data.employees);
  res.status(201).json(data.employees);
};

//delete employee
const deleteEmployee = (req, res) => {
  if (!req.body.id) {
    return res.status(404).json("Sorry User not found with id!");
  }
  const dataEmployees = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees(dataEmployees);
  res.status(201).json(data.employees);
};

//get single employee
const getEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(emp.id));
  if (!employee) {
    return req.status(404).send("Sorry user not found!");
  }
  res.status(201).json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
