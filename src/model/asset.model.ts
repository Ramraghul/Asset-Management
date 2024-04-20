import { DataTypes } from "sequelize";
import sequelize from '../database/connection';
import AssetCategory from "./assetCategory.model";

const Asset = sequelize.define(
    'Asset',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        serial_number: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        make: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        purchase_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('in stock', 'issued', 'scrap'),
            allowNull: true,
            defaultValue: 'in stock'
        },
        asset_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: AssetCategory,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: true,
        tableName: "Assets",
        paranoid: true
    }
);

Asset.belongsTo(AssetCategory, { foreignKey: 'asset_category_id' });

export default Asset;
