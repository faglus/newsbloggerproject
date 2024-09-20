const express = require('express');

const admin_router = express();

const bodyParser =require('body-parser');
admin_router.use(bodyParser.json());
admin_router.use(bodyParser.urlencoded({extended: true}));

// view
admin_router.set('view engine','ejs');
admin_router.set('views','./views');

const multer = require('multer');
const path = require('path');
admin_router.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images');
        cb(null, uploadPath);

    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);

    }
});
const upload = multer({ storage: storage });





const adminController = require('../controller/admin.controller')





admin_router.get('/blog-setup', adminController.blogSetup);

admin_router.post('/blog-setup',upload.single('blog_logo'),adminController.blogSetupSave);

admin_router.get('/');

admin_router.get('/dashboard',adminController.dashboard)



module.exports = admin_router;