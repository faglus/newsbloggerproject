const BlogSetting = require('../model/blog.schema');

const isBlogEXistOrNot = async (req, res, next) => {
    try {
        const blogs = await BlogSetting.find({});
        
        if (blogs.length == 0 && req.originalUrl != '/blog-setup') {
            res.redirect('/blog-setup');
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    isBlogEXistOrNot,
}