const { verify } = require("jsonwebtoken");

const token_validation = {
    checkToken: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            const decoded = verify(token, "wmkd156skmx40zkm25s81zxc");
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






 