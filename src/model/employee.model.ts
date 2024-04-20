import { DataTypes } from "sequelize";
import sequelize from '../database/connection';

const Employee = sequelize.define(
    'Employee',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_of_joining: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: true,
            defaultValue: 'active'
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "Employees"
    }
);

export default Employee;
