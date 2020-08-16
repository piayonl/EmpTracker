DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE employeeDepartment (
  department_id INT,
  department_name VARCHAR(30),
  PRIMARY KEY (department_id)
);

CREATE TABLE employeeRole (
  role_id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(19,2) NULL,
  department_id INT,
  PRIMARY KEY (role_id)
);

CREATE TABLE employees (
  employee_id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (employee_id)
);


INSERT INTO `employeeDepartment` VALUES 
(111,'Development'),
(222,'Personnel');


INSERT INTO `employeeRole` VALUES 
(333,'Starter','2000000.00', '222'),
(444,'Bench','1000000.00', '222'),
(555,'Reserve','500000.00', '222'),
(777,'Coach','400000.00', '111');

INSERT INTO `employees` VALUES 
(001,'Joel','Embiid','333','013'),
(002,'Ben','Simmons','333','013'),
(003,'Tobias','Harris','333','013'),
(004,'Josh','Richardson','333','013'),
(005,'Shake','Milton','333','013'),
(006,'Alec','Burks','444','014'),
(007,'Raul','Neto','444','014'),
(008,'Al','Horford','444','014'),
(009,'Mike','Scott','444','014'),
(010,'Matisse','Thybulle','444','014'),
(011,'Norvel','Pelle','555','015'),
(012,'Marial','Shayok','555','015'),
(013,'Brett','Brown','777', NULL),
(014,'Ime','Udoka','777','012'),
(015,'John','Bryant','777','012');

-- //JOINING MORE THAN TWO TABLES
SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, employeeRole.role_id, 
employeeRole.title, employeeRole.salary, employeeRole.department_id, employeeDepartment.department_name
FROM employees
JOIN employeeRole ON employees.role_id = employeeRole.role_id
JOIN employeeDepartment ON employeeRole.department_id = employeeDepartment.department_id
ORDER BY employees.first_name, employees.last_name;

SELECT * FROM employeeDepartment;
SELECT * FROM employeeRole;
SELECT * FROM employees;