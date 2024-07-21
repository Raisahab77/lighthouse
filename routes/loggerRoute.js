const express = require("express");
const router = express.Router();
const loggerController= require("../controllers/loggerController");

router.get("/get-all", loggerController.logs);
router.get("/getDataById/:id", loggerController.logDetails); 

module.exports = router;
