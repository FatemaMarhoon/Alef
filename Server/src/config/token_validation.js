const admin = require('./firebase.config')

const token_validation = {
    //must log-in (role doesn't matter)
    checkToken: (req, res, next) => {
        var token = req.get("authorization"); // extract the token from request header 
        if (token) {
            token = token.split(' ')[1]
            const decoded = admin.auth().verifyIdToken(token) // validate token 
            if (decoded) {
                next(); // if valid, proceed to the next item called (the controller in the route)
            }
            else {
                res.status(401).json({ message: "Access Denied! Invalid Token." }); // invalid or expired token  
            }
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthenticated User." }) // no token passed with the request
        }
    },

    //must be logged-in and role is Staff 
    checkStaff: (req, res, next) => {
        var token = req.get("authorization"); // extract the token from request header 
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token) // validate token 
                .then((claims) => { 
                    if (claims.role === "Staff") { // compare role stored in user claims 
                        next(); // if matches, proceed to the next 
                    }
                    else {
                        res.status(403).json({ message: "Access Denied! User Role Unauthorized." }); 
                    }
                });
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthenticated User." })
        }
    },

    //must be logged in and role is Admin
    checkAdmin: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    if (claims.role === "Admin") {
                        next();
                    }
                    else {
                        res.status(403).json({ message: "Access Denied! User Role Unauthorized." });
                    }
                });
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthenticated User." })
        }
    },

    //must be logged in and role is Parent
    checkParent: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    if (claims.role === "Parent") {
                        next();
                    }
                    else {
                        res.status(403).json({ message: "Access Denied! User Role Unauthorized." });
                    }
                });
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthenticated User." })
        }
    },

    //must be logged in and role is Teacher
    checkTeacher: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    if (claims.role === "Teacher") {
                        next();
                    }
                    else {
                        res.status(403).json({ message: "Access Denied! User Role Unauthorized." });
                    }
                });
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthenticated User." })
        }
    },
    
    //must be logged in and role is Super Admin
    checkSuperAdmin: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    if (claims.role === "Super Admin") {
                        next();
                    }
                    else {
                        res.status(403).json({ message: "Access Denied! User Role Unauthorized." });
                    }
                });
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthenticated User." })
        }
    },

};

module.exports = token_validation;






