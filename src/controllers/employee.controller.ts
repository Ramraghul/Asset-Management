//Require Imports;
import { Request, Response } from 'express';
import { Employee } from '../model/index.model';


//Employee Controller;
const employeeController = {

    //Create New Employee;
    async createNewEmployee(req: Request, res: Response) {
        try {
            const inData = req.body;

            await Employee.create(inData);

            return res.status(201).json({
                status: true,
                message: 'New Employee Created Successfully',
            });
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const validationError = error.errors[0];
                const errorMessage = `${validationError.message}`;

                return res.status(500).json({
                    status: false,
                    error: errorMessage,
                });
            } else {
                return res.status(500).json({
                    status: false,
                    error: error.message,
                });
            }
        }
    },

    //Employee Update By Id;
    async updateCourseById(req: Request, res: Response) {
        try {

            const id: number = parseInt(req.params.id as string);

            const inData = req.body

            const existingEmployee = await Employee.findByPk(id);

            if (!existingEmployee) {
                return res.status(404).json({
                    status: false,
                    error: 'Employee not found'
                });
            }

            await existingEmployee.update(inData);

            return res.status(200).json({
                status: true,
                message: 'Employee updated successfully',
            });

        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    //Get All Employee;
    async getAllEmployeeList(req: Request, res: Response) {
        try {
            const { status } = req.query;
            const whereCondition = status ? { status } : {};

            const finalData: Array<any> = await Employee.findAll({ where: whereCondition });

            if (!finalData) {
                return res.status(400).json({
                    status: false,
                    message: 'No Employee Data Founded',
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'Employee List Fetched successfully',
                    data: finalData
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

}


//Connection Export;
export default employeeController;
