const bcrypt = require('bcrypt');
const user = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// signup 
exports.register = async (req, res) => {
    try {
        // get data 
        const { name, email, password, role } = req.body;

        // check if user already exists
        const existingUser = await user.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                status: false,
                message: "user already exist"
            });
        }

        // password secure 
        let hashedPassword 
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(404).json({
                status: false,
                message: "error in hasing password"
            });
        }
        // create entry 
        const entry = await user.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            status: true,
            message: 'user created successfully'
        })
    }
    catch (err) {
        return res.status(404).json({
            status: false,
            message: "something is wrong in user creation"
        });
    }
}

// login 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                status: false,
                message: "please fill all the detaileds carefully"
            })
        }

        const userAvaliable = await user.findOne({ email })

        if (!userAvaliable) {
            return res.status(404).json({
                status: false,
                message: "user is not register signup first"
            })
        }
        const payload = {
            email: userAvaliable.email,
            id: userAvaliable._id,
            role: userAvaliable.role
        }
        console.log("DB password =>", userAvaliable.password);
        console.log("Input password =>", password);
        if(await bcrypt.compare(password,userAvaliable.password)){

            let token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
            );
            userAvaliable.token = token;

            userAvaliable.password = undefined
            const options = {
                httpOnly:true
            }

            res.cookie('token',token,options).status(200).json({
                status:true,
                token,
                userAvaliable,
                message:"user loged in successfully"
            })
        }

        else {
            // password dont match 
            return res.status(404).json({
                status: false,
                message: "password is incorrect"
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({
            status: false,
            message: "Login failure"
        })
    }
}