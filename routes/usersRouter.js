var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController'); //import controller pour pouvoir utiliser la fct 
const upload = require('../middlewares/uploadFile');
const {requireAuthUser} = require('../middlewares/authMiddleware');

/* GET users listing. */
router.post('/addUserClient',userController.addUserClient); 
router.post('/addUserAdmin',userController.addUserAdmin); 
router.post('/addUserTransporteur',userController.addUserTransporteur); 
router.get('/getUserById/:id',requireAuthUser,userController.getUserById); 
router.delete('/deleteUserById/:id',requireAuthUser,userController.deleteUserById); 
router.get('/getAllUsers',requireAuthUser,userController.getAllUsers); 
router.put('/updateUserById/:id',userController.updateUserById); 
router.get('/searchUserByUsername',userController.searchUserByUsername); 
router.get('/getAllClient',requireAuthUser,userController.getAllClient); 
router.get('/getAllTransporteur',requireAuthUser,userController.getAllTransporteur); 
router.get('/getAllAdmin',requireAuthUser,userController.getAllAdmin); 
router.post('/addUserClientWithImg',upload.single("image_user"),userController.addUserClientWithImg); 
router.post('/addUserTransporteurWithImg',upload.single("image_user"),userController.addUserTransporteurWithImg); 
router.post('/login',userController.login); 
router.post('/logout',userController.logout); 

module.exports = router;
