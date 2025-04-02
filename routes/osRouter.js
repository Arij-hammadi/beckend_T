var express = require('express'); //import express
var router = express.Router(); //import router
const osController = require('../controllers/osController'); //import controller pour pouvoir utiliser la fct 

/* GET home page. */
router.get('/getOsInformation', osController.getOsInformation );

module.exports = router;
