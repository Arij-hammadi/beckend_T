const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/getAllClients", clientController.getAllClients);
router.get("/getClientById/:id", clientController.getClientById);
router.post("/addClient", clientController.addClient);
router.put("/updateClient/:id", clientController.updateClient);
router.delete("/deleteClient/:id", clientController.deleteClient);

module.exports = router;