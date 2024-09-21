const UserSchema = require('../model/user.schema');
const bcrypt = require('bcrypt');




const loginLoader = async (req, res) => {
    try {
        res.render('login');

    } catch (error) {
        console.log(error.message);

    }
};

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await UserSchema.findOne({ email: email });

        if (userData) {
            const passwordMatch = bcrypt.compare(password, userData.password);
            req.session.User_id = userData._id;
            req.session.is_admin = userData.is_admin;
            if (passwordMatch) {
                if (userData.is_admin == 1) {
                    res.redirect('/dashboard');

                } else {
                    res.redirect('/profile');
                }
            } else {
                res.render('login', { message: "Incorrect password!!" });

            }
        } else {
            res.render('login', { message: "Email-id doesnot exist" });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const profile =(req,res)=>{
    try{
        res.send('i am in profile');
    } catch(error){
        console.log(error.message);
    }
}



module.exports = {
    loginLoader,
    
    verifyLogin,
    profile
}