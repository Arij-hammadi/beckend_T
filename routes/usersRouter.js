var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController'); //import controller pour pouvoir utiliser la fct 
const upload = require('../middlewares/uploadFile');

/* GET users listing. */
router.post('/addUserClient',userController.addUserClient); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.post('/addUserTransporteur',userController.addUserTransporteur); 
router.get('/getUserById:id',userController.getUserById); 
router.delete('/deleteUserById:id',userController.deleteUserById); 
router.get('/getAllUsers',userController.getAllUsers); 
router.put('/updateUserById/:id',userController.updateUserById); 
router.get('/searchUserByUsername',userController.searchUserByUsername); 
router.get('/getAllClient',userController.getAllClient); 
router.get('/getAllTransporteur',userController.getAllTransporteur); 
router.get('/getAllAdmin',userController.getAllAdmin); 
router.post('/addUserClientWithImg',upload.single("image_user"),userController.addUserClientWithImg); 
router.post('/addUserTransporteurWithImg',upload.single("image_user"),userController.addUserTransporteurWithImg); 

module.exports = router;
