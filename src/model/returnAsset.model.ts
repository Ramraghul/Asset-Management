import { DataTypes } from "sequelize";
import sequelize from '../database/connection';
import IssueAsset from "./issueAsset.model";

const ReturnAsset = sequelize.define(
    'ReturnAsset',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        issue_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: IssueAsset,
                key: 'id'
            }
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        return_reason: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "ReturnAsset"
    }
);

ReturnAsset.belongsTo(IssueAsset, { foreignKey: 'issue_id', targetKey: 'id' });

export default ReturnAsset;
