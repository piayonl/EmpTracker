var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // viewEmployees();
    start();
    //   queryAllEmployees();
    //   queryEmployeeRole();
});

        function start() {
            inquirer
                .prompt({
                    name: "viewOrAdd",
                    type: "list",
                    message: "Would you like to [VIEW] or [ADD] ?",
                    choices: ["VIEW EMPLOYEE", "VIEW ROLE", "VIEW DEPARTMENT", "ADD EMPLOYEE", "ADD ROLE", "ADD DEPARTMENT", "EXIT"]
                })
            //     .then(function (answer) {
            //         // based on their answer, either call the Search or the Add functions
            //         switch (answer.vieworAdd) {
            //         case   "Add an Employee"
            //         addEmployee();
            //         }
            //         else if (answer.searchOrAdd === "ADD ROLE") {
            //             addRole();
            //         }
            //         else if (answer.searchOrAdd === "ADD DEPARTMENT") {
            //             addDepartment();
            //         }
            //         if (answer.searchOrAdd === "VIEW EMPLOYEE") {
            //             viewEmployees();
            //         } 
            //         else if (answer.searchOrAdd === "VIEW ROLE") {
            //             viewRole();
            //         } 
            //         else if (answer.searchOrAdd === "VIEW DEPARTMENT") {
            //             viewDepartment();
            //         }
            //         else {
            //             connection.end();
            //         }
            //     });
            // }
                .then(function (answer) {
                    // based on their answer, either call the Search or the Add functions
                    if (answer.viewOrAdd === "ADD EMPLOYEE") {
                        addEmployee();
                    }
                    else if (answer.viewOrAdd === "ADD ROLE") {
                        addRole();
                    }
                    else if (answer.viewOrAdd === "ADD DEPARTMENT") {
                        addDepartment();
                    }
                    else if (answer.viewOrAdd === "VIEW EMPLOYEE") {
                        viewEmployees();
                    } 
                    else if (answer.viewOrAdd === "VIEW ROLE") {
                        viewRole();
                    } 
                    else if (answer.viewOrAdd === "VIEW DEPARTMENT") {
                        viewDepartment();
                    }
                    else {
                        connection.end();
                    }
                });
            }

// VIEW EMPLOYEES

        function addEmployee() {
            // prompt for info about employee being added
            inquirer
                .prompt([
                    {
                        name: "employee_id",
                        type: "input",
                        message: "What is the employee ID of the employee you are submitting?"
                    },
                    {
                        name: "first_name",
                        type: "input",
                        message: "What is the first name of the employee you are submitting?"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is the last name of the employee you are submitting?"
                    },
                    {
                        name: "role_id",
                        type: "input",
                        message: "What is the role id of the employee you are submitting?"
                    },
                    {
                        name: "manager_id",
                        type: "input",
                        message: "What is the manager id of the employee that you are submitting?"
                    },
                ])
                    .then(function(answer) {
                                // when finished prompting, insert a new item into the db with that info
                                connection.query(
                                  "INSERT INTO employees SET ?",
                                  { employee_id: answer.employee_id,
                                    first_name: answer.first_name,
                                    last_name: answer.last_name,
                                    role_id: answer.role_id,
                                    manager_id: answer.manager_id,
                                  },
                                  function(err) {
                                    if (err) throw err;
                                    console.log("Your employee was added successfully!");
                                    // re-prompt the user for if they want to add or search
                                    start();
                                }
                            );
                            });
                    }
// ADD DEPARTMENT
                    function addDepartment() {
                        // prompt for info about Department being added
                        inquirer
                            .prompt([
                                {
                                    name: "department_id",
                                    type: "input",
                                    message: "What is the new department ID you are adding?"
                                },
                                {
                                    name: "department_name",
                                    type: "input",
                                    message: "What is the name of the new department you are adding?"
                                },
                            ])
                                .then(function(answer) {
                                            // when finished prompting, insert a new item into the db with that info
                                            connection.query(
                                              "INSERT INTO employeeDepartment SET ?",
                                              { department_id: answer.department_id,
                                                department_name: answer.department_name,
                                              },
                                              function(err) {
                                                if (err) throw err;
                                                console.log("Your Department was added successfully!");
                                                // re-prompt the user for if they want to add or search
                                                start();
                                            }
                                        );
                                        });
                                }

// ADD ROLE
                    function addRole() {
                        // prompt for info about Role being added
                        inquirer
                            .prompt([
                                {
                                    name: "role_id",
                                    type: "input",
                                    message: "What is the new role ID you are adding?"
                                },
                                {
                                    name: "title",
                                    type: "input",
                                    message: "What is the new title you are adding?"
                                },
                                {
                                    name: "salary",
                                    type: "input",
                                    message: "What is the new salary of the role you are adding?"
                                },
                                {
                                    name: "department_id",
                                    type: "input",
                                    message: "What is the new department id of the role you are adding?"
                                },
                            ])
                                .then(function(answer) {
                                            // when finished prompting, insert a new item into the db with that info
                                            connection.query(
                                              "INSERT INTO employeeRole SET ?",
                                              { role_id: answer.role_id,
                                                title: answer.title,
                                                salary: answer.salary,
                                                department_id: answer.department_id,
                                              },
                                              function(err) {
                                                if (err) throw err;
                                                console.log("Your Role was added successfully!");
                                                // re-prompt the user for if they want to add or search
                                                start();
                                            }
                                        );
                                        });
                                }


// VIEW EMPLOYEES

function viewEmployees() {
    connection.query("SELECT employee_id, first_name, last_name, role_id, manager_id FROM employees", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        // console.table(res[i].employee_id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
      }
      console.table(res);
      start();
    });
  }

  function viewDepartment() {
    connection.query("SELECT department_id, department_name FROM employeeDepartment", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      }
      console.table(res);
      start();
    });
  }

  function viewRole() {
    connection.query("SELECT role_id, title, salary, department_id FROM employeeRole", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
      }
      console.table(res);
      start();
    });
  }

// function viewEmployees() {
//         connection.query("SELECT employee_id, first_name, last_name, role_id, manager_id FROM employees", function(err, res) {
//           if (err) throw err;
//           for (var i = 0; i < res.length; i++) {
//             console.table(res[i].employee_id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + " | " + res[i].manager_id);
//           }
//           console.table(res);
//         });
//       }

// function viewEmployees() {
//     var query = "SELECT first_name, last_name, role_id, manager_id FROM employees";
//     connection.query(query,function (err, res) {
//         for (var i = 0; i < res.length; i++)
//         if (err) throw err;
//     })
// }
//     console.table (res);

