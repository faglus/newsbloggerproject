const express = require('express');
const adminController =require('../controller/admin.controller')


const admin_router = express();

admin_router.get('/test', adminController.blogcontroller)

admin_router.get('/');

module.exports = admin_router;