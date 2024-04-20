//Require Imports;
import { Request, Response } from 'express';
import { AssetCategory } from '../model/index.model';


//Asset Category Controller;
const assetCategoryController = {

    //Create New Asset Category;
    async createNewAssetCategory(req: Request, res: Response) {
        try {
            const inData = req.body;

            // create a new Asset Category
            await AssetCategory.create(inData);

            return res.status(201).json({
                status: true,
                message: 'New Asset Category Created Successfully',
            });
        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    //Asset Category Update By Id;
    async updateAssetCategoryById(req: Request, res: Response) {
        try {

            const id: number = parseInt(req.params.id as string);

            const inData = req.body

            const existingAssetCategory = await AssetCategory.findByPk(id);

            if (!existingAssetCategory) {
                return res.status(404).json({
                    status: false,
                    error: 'Asset Category not found'
                });
            }

            await existingAssetCategory.update(inData);

            return res.status(200).json({
                status: true,
                message: 'Asset Category updated successfully',
            });

        } catch (error: any) {
            return res.status(500).json({
                status: false,
                error: error.message,
            });
        }
    },

    //Get All Asset Category;
    async getAllAssetCategoryList(req: Request, res: Response) {
        try {
            const finalData: Array<any> = await AssetCategory.findAll();

            if (!finalData) {
                return res.status(400).json({
                    status: false,
                    message: 'No Asset Category Data Founded',
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'Asset Category List Fetched successfully',
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
export default assetCategoryController;
