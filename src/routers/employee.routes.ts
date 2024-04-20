//Require Imports;
import express from "express";
import employeeController from "../controllers/employee.controller";

const route = express.Router();

//All Routes;
//Create New Employee;
route.post('/createNewEmployee', employeeController.createNewEmployee);

//Update Exist Employee;
route.put('/updateEmployee/:id', employeeController.updateCourseById);

//Get  All Employees;
route.get("/allEmployees",employeeController.getAllEmployeeList)


//Connection Export;
export default route;
