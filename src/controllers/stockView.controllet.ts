//Require Imports;
import { Request, Response } from 'express';
import { Asset, AssetCategory, StockView } from '../model/index.model';



//StockView Controller;
const stockViewController = {

    //Get All StockView;
    async getAllStockViewList(req: Request, res: Response) {
        try {
            const finalData = await StockView.findAll({
                attributes: ["id", "quantity"],
                include: [
                    {
                        model: Asset,
                        attributes: ["serial_number", "make", "model", "purchase_price", "status"],
                        include: [
                            {
                                model: AssetCategory,
                                attributes: ["category_name"]
                            }
                        ]
                    }
                ]
            });

            if (!finalData) {
                return res.status(400).json({
                    status: false,
                    message: 'No StockView Data Founded',
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'StockView List Fetched successfully',
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
export default stockViewController;
