const router = require('express').Router();
const AdminController = require('./admin.controller')
router.get('/admin',AdminController.getAdmin);
router.post('/admin/login',AdminController.login);
router.get('/admin/twofa',AdminController.gettwofa);
router.post('/admin/twofa',AdminController.twofa);
router.get('/dashboard',AdminController.getDashboard);
router.post('/dashboard',AdminController.postDashboard);
module.exports = router;