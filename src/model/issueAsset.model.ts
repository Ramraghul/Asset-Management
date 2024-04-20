import { DataTypes } from "sequelize";
import sequelize from '../database/connection';
import Employee from "./employee.model";
import Asset from "./asset.model";

const IssueAsset = sequelize.define(
    'IssueAsset',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        asset_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Asset,
                key: 'id'
            }
        },
        issue_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "IssueAsset"
    }
);

IssueAsset.belongsTo(Employee, { foreignKey: 'employee_id', targetKey: 'id' });
IssueAsset.belongsTo(Asset, { foreignKey: 'asset_id', targetKey: 'id' });

export default IssueAsset;
