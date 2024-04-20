// StockView.js
import { DataTypes } from "sequelize";
import sequelize from '../database/connection';
import Asset from "./asset.model";

const StockView = sequelize.define(
    'StockView',
    {
        asset_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Asset,
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "StockView"
    }
);

StockView.belongsTo(Asset, { foreignKey: 'asset_id', targetKey: 'id' });

export default StockView;
