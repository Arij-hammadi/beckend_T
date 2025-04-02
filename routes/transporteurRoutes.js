const express = require("express");
const router = express.Router();
const transporteurController = require("../controllers/transporteurController");

router.get("/getAllTransporteurs", transporteurController.getAllTransporteurs);
router.get("/getTransporteurById/:id", transporteurController.getTransporteurById);
router.post("/addTransporteur", transporteurController.addTransporteur);
router.put("/updateTransporteur/:id", transporteurController.updateTransporteur);
router.delete("/deleteTransporteur/:id", transporteurController.deleteTransporteur);
router.put("/updateVehicule/:id", transporteurController.updateVehicule);


module.exports = router;