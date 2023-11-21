const { verify } = require("jsonwebtoken");
const admin = require('./firebase.config')

const token_validation = {
    checkToken: (req, res, next) => {
        var token = req.get("authorization"); 
        console.log(token)
        if (token) {
            token = token.split(' ')[1]
            console.log("after: ",token) 
            const decoded = admin.auth().verifyIdToken(token) 
            if (decoded) {
                next();
            }
            else {
                res.json({ message: "Access Denied! Invalid Token." });
            }
        }
        else {
            res.json({ message: "Access Denied! Unauthorized User." })
        }
    }
};

module.exports = token_validation;






 