//Require Imports;
import express from "express";
import stockViewController from "../controllers/stockView.controllet";

const route = express.Router();

//All Routes;
//Get  All StockView;
route.get("/allStockView", stockViewController.getAllStockViewList)


//Connection Export;
export default route;
