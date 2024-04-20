import { DataTypes } from "sequelize";
import sequelize from '../database/connection';
import Asset from "./asset.model";

const AssetHistory = sequelize.define(
    'AssetHistory',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        asset_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Asset,
                key: 'id'
            }
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        action_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        additional_details: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "AssetHistory"
    }
);

AssetHistory.belongsTo(Asset, { foreignKey: 'asset_id', targetKey: 'id' });

export default AssetHistory;
