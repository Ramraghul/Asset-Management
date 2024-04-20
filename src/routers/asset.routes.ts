//Require Imports;
import express from "express";
import assetController from "../controllers/asset.controller";

const route = express.Router();

//All Routes;
//Create New Asset;
route.post('/createNewAsset', assetController.createNewAsset);

//Update Exist Asset;
route.put('/updateAsset/:id', assetController.updateAssetById);

//Get  All Asset;
route.get("/allAssets", assetController.getAllAssetList);

// Issue Asset;
route.post("/issueAsset", assetController.issueAsset);

//Return Asset;
route.post("/returnAsset", assetController.returnAsset);

//Scrap Asset;
route.post("/scrapAsset", assetController.ScrapAsset);

//Asset History;
route.get("/assetIdByHistory/:id", assetController.assetIdByHistory);

//Connection Export;
export default route;
