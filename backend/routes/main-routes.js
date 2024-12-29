const express=require('express');
const router=express.Router();
const Initialize=require('../controller/apiController').Initialize;
const Transactioncon=require('../controller/apiController').Transactioncon;
const Statistic=require('../controller/apiController').Statistic;
const Barchart=require('../controller/apiController').Barchart;
const Piechart=require('../controller/apiController').Piechart;


router.get("/api/initialize",Initialize );
router.get("/api/transactions",Transactioncon);
router.get("/api/statistics",Statistic);
router.get("/api/bar-chart",Barchart );
router.get("/api/pie-chart",Piechart );

module.exports=router;

