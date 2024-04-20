import { DataTypes } from "sequelize";
import sequelize from '../database/connection';
import Asset from "./asset.model";

const ScrapAsset = sequelize.define(
    'ScrapAsset',
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
        scrap_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        scrap_reason: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        collate: "utf8mb4_general_ci",
        timestamps: false,
        tableName: "ScrapAsset"
    }
);

ScrapAsset.belongsTo(Asset, { foreignKey: 'asset_id', targetKey: 'id' });

export default ScrapAsset;
