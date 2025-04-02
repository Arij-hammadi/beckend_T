const express = require("express");
const router = express.Router();
const devisController = require("../controllers/devisController");

router.get("/getAllDevis", devisController.getAllDevis);
router.post("/addDevis", devisController.addDevis);

module.exports = router;