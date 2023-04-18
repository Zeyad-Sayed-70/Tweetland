const UserAuthenticationModel = require('../../Models/authentication/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CreateAccount = async (req, res, next) => {
    try {
        const { username, password, email, tagName, birth } = req.body;

        if ( !username || !password || !email || !tagName || !birth ) {
            res.status(400).json({ message: "you're missed somthing" })
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(password, salt);

        const data = await UserAuthenticationModel.create({
            username,
            password: hashed_pass,
            email,
            tagName,
            birth
        });

        next();
    } catch (error) {
        console.log(error.message);
        if ( error.code === 11000 ) {
            if ( error.message.includes('username') ) {
                res.status(400).json({ message: "this username is already taken" });
                return;
            }
            
            if ( error.message.includes('email') ) {
                res.status(400).json({ message: "this email is already taken" });
                return;
            }
            
            if ( error.message.includes('tagName') ) {
                res.status(400).json({ message: "this tagName is already taken" });
                return;
            }
        }
    }
}

module.exports = { CreateAccount }