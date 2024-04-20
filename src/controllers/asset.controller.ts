//Require Imports;
import { Request, Response } from 'express';
import { Asset, AssetCategory, AssetHistory, Employee, IssueAsset, ReturnAsset, ScrapAsset } from '../model/index.model';
import { Op } from 'sequelize';


//Asset Controller;
const assetController = {

    //Create New Asset;
    async createNewAsset(req: Request, res: Response) {
        try {
            const inData = req.body;

            // create a new Asset
            let newAsset = await Asset.create(inData);

            //Create Log;
            const logData = {
                asset_id: newAsset.dataValues.id,
                action: "Created",
                action_date: Date.now(),
                additional_details: 'New Asset Purchased'
            }
            createAssetHistoryEntry(logData);

            return res.status(201).json({
                status: true,
                message: 'New Asset Created Successfully',
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

    //Asset Update By Id;
    async updateAssetById(req: Request, res: Response) {
        try {

            const id: number = parseInt(req.params.id as string);

            const inData = req.body

            const existingAsset = await Asset.findByPk(id);

            if (!existingAsset) {
                return res.status(404).json({
                    status: false,
                    error: 'Asset not found'
                });
            }

            await existingAsset.update(inData);

            //Create Log;
            const logData = {
                asset_id: id,
                action: "Updated",
                action_date: Date.now(),
                additional_details: `Asset Id ${id} Updated`
            }
            createAssetHistoryEntry(logData);

            return res.status(200).json({
                status: true,
                message: 'Asset updated successfully',
            });

        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    //Get All Asset;
    async getAllAssetList(req: Request, res: Response) {
        try {
            const { make, model } = req.query;

            const searchCriteria: any = {};
            if (make) {
                searchCriteria.make = { [Op.like]: `%${make}%` };
            }
            if (model) {
                searchCriteria.model = { [Op.like]: `%${model}%` };
            }
            const finalData = await Asset.findAll({
                where: searchCriteria,
                include: {
                    model: AssetCategory,
                    attributes: ["category_name"]
                }
            });

            if (!finalData) {
                return res.status(400).json({
                    status: false,
                    message: 'No Asset Data Founded',
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'Asset List Fetched successfully',
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

    // Issue Asset
    async issueAsset(req: Request, res: Response) {
        try {
            const { employee_id, asset_id } = req.body;
            const inData = req.body

            // Check if employee_id and asset_id are provided
            if (!employee_id || !asset_id) {
                return res.status(400).json({
                    status: false,
                    message: 'Employee ID and Asset ID are required',
                });
            }

            // Check if employee with given ID exists
            const employee = await Employee.findOne({ where: { id: employee_id } });
            if (!employee) {
                return res.status(404).json({
                    status: false,
                    message: "Invalid Employee ID"
                });
            }

            // Check if asset with given ID exists
            const asset = await Asset.findOne({ where: { id: asset_id } });
            if (!asset) {
                return res.status(404).json({
                    status: false,
                    message: "Invalid Asset ID"
                });
            }

            // Issue the asset
            await IssueAsset.create(inData);

            //Create Log;
            const logData = {
                asset_id: asset_id,
                action: "Issued",
                action_date: Date.now(),
                additional_details: `Asset Id ${asset_id} Issued to Employee Id ${employee_id} `
            }
            createAssetHistoryEntry(logData);

            return res.status(201).json({
                status: true,
                message: 'Asset issued successfully',
            });
        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    // Return Asset
    async returnAsset(req: Request, res: Response) {
        try {
            const { issue_id } = req.body;
            const inData = req.body

            // Check if issue Id are provided
            if (!issue_id) {
                return res.status(400).json({
                    status: false,
                    message: 'Issue ID is required',
                });
            }

            // Return the asset
            await ReturnAsset.create(inData);

            return res.status(201).json({
                status: true,
                message: 'Asset Return successfully',
            });
        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    // Scrap Asset
    async ScrapAsset(req: Request, res: Response) {
        try {
            const { asset_id } = req.body;
            const inData = req.body

            // Check if asset Id are provided
            if (!asset_id) {
                return res.status(400).json({
                    status: false,
                    message: 'Asset ID is required',
                });
            }

            const checkAssetIsExist = await Asset.findByPk(asset_id);
            if (!checkAssetIsExist) {
                return res.status(400).json({
                    status: false,
                    message: 'Asset Is Not Founded',
                });
            }


            // Return the asset
            await ScrapAsset.create(inData);

            //Mark That Assert as Scrap
            await Asset.update({ deletedAt: Date.now() }, { where: { id: asset_id } });

            //Create Log;
            const logData = {
                asset_id: asset_id,
                action: "Scaped",
                action_date: Date.now(),
                additional_details: `Asset Id ${asset_id} Move To Scraped`
            }
            createAssetHistoryEntry(logData);

            return res.status(201).json({
                status: true,
                message: 'Asset Scraped successfully',
            });
        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    //Asset History Based on Asset Id
    async assetIdByHistory(req: Request, res: Response) {
        try {

            const id: number = parseInt(req.params.id as string);

            if (!id) {
                return res.status(500).json({
                    status: false,
                    error: 'Asset Id Important'
                });
            }
            const fetchData = await AssetHistory.findAll(
                {
                    where: { asset_id: id }
                }
            )
            if (fetchData.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'No Data Founded',
                });
            }

            return res.status(200).json({
                status: true,
                message: 'Asset History Fetched successfully',
                data: fetchData
            });

        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

}

//Create Asset History;
async function createAssetHistoryEntry(logData: any) {
    await AssetHistory.create(logData);
}


//Connection Export;
export default assetController;
