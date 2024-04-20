import { DataTypes } from "sequelize";
import sequelize from '../database/connection';

const AssetCategory = sequelize.define(
    'AssetCategory',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "AssetCategories"
    }
);

export default AssetCategory;
