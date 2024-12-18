const express = require('express')



const userController = require('../Controllers/userControllers')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const projectController = require('../Controllers/projectControllers')
const multerMiddleware = require('../Middleware/multerMiddleware')

const router= express.Router()

router.post('/api/register',userController.registerAPI)

router.post('/api/login',userController.loginAPI)

router.post('/api/addproject', jwtMiddleware,multerMiddleware.single('projectImg'), projectController.addProjectAPI);

router.get('/api/getalluserprojects',jwtMiddleware,projectController.getAllUserProjectsAPI)
router.get('/api/getuserproject',jwtMiddleware,projectController.getUserProjectAPI)

router.get('/api/gethomeproject',projectController.getHomeProjectAPI)

router.put('/api/editproject/:projectId', jwtMiddleware,multerMiddleware.single('projectImg'), projectController.editProjectAPI);

router.delete('/api/deleteproject/:projectId',jwtMiddleware,projectController.deleteProjectAPI)






module.exports=router