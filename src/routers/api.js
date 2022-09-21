const express=require('express');

const UserController=require('../Controllers/testimonialController');
const router=express.Router();

router.get('/getuser',UserController.getUsers);
router.post('/createUser',UserController.createUser);
router.put('/updateUser/:id',UserController.updateUser);
router.delete('/deleteUser/:id',UserController.deleteUser);

module.exports=router;