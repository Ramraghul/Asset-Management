//Require Imports;
import express from "express";
import assetRoutes from "./asset.routes";
import employeeRoutes from "./employee.routes";
import assetCategory from "./assetCategory.routes";
import stockView from "./stockView.routes"

const router = express.Router();

// Master Routes
router.use('/asset', assetRoutes);
router.use("/assetCategory", assetCategory);
router.use('/employee', employeeRoutes);
router.use('/stock', stockView);


//Connection Export;
export default router;
