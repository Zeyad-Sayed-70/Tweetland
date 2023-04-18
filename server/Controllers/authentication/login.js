const Models = require('../../Models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Login = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        if ( !password || ( !username && !email ) ) {
            return res.status(400).json({ message: "you're missed somthing" })
        }

        let data;
        if ( username ) {
            data = await Models.UserAuth.findOne({username});
        }

        if ( email )
            data = await Models.UserAuth.findOne({email});
            
        if ( data === null ) {
            return res.status(400).json({ message: "this username or email isn't correct, try again" })
        }

        
        const isPass = await bcrypt.compare(password, data.password);

        if ( !isPass ) {
            return res.status(400).json({ message: "this password isn't correct, try again" })
        }

        const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET_KEY);

        const resData = {
            username: data.username,
            email: data.email,
            tagName: data.tagName,
            birth: data.birth,
        };

        res.status(200).json({ message: 'you have been Logined', token, userData: resData })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { Login }