//Require Imports;
import express from "express";
import assetCategoryController from "../controllers/assetCategory.controller";

const route = express.Router();

//All Routes;
//Create New Asset Category;
route.post('/createNewAssetCategory', assetCategoryController.createNewAssetCategory);

//Update Exist Asset Category;
route.put('/updateAssetCategory/:id', assetCategoryController.updateAssetCategoryById);

//Get  All Asset Category;
route.get("/allAssetCategory", assetCategoryController.getAllAssetCategoryList)


//Connection Export;
export default route;
