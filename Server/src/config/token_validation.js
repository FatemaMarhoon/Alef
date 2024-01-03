const admin = require('./firebase.config')

const token_validation = {
    //must log-in (role doesn't matter)
    checkToken: (req, res, next) => {
        try {
            var token = req.get("authorization"); // extract the token from request header 
            if (token) {
                token = token.split(' ')[1]
                const decoded = admin.auth().verifyIdToken(token) // validate token 
                if (decoded) {
                    console.log("VALID")
                    next(); // if valid, proceed to the next item called (the controller in the route)
                }
                else {
                    res.status(401).json({ message: "Access Denied! Invalid Token." }); // invalid or expired token  
                }
            }
            else {
                res.status(401).json({ message: "Access Denied! Unauthenticated User." }) // no token passed with the request
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error Validating Token: ", error })
        }
    },

    //must be logged-in and role is Staff at least (Staff, Admin, SuperAdmin)
    checkStaff: (req, res, next) => {
        try {
            var token = req.get("authorization"); // extract the token from request header 
            if (token) {
                token = token.split(' ')[1]
                admin.auth().verifyIdToken(token) // validate token 
                    .then((claims) => {
                        if (claims.role === "Staff" || claims.role == "Admin") { // compare role stored in user claims 
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
        }
        catch (error) {
            res.status(500).json({ message: "Error Validating Token: ", error })
        }
    },

    //must be logged in and role is Admin
    checkAdmin: (req, res, next) => {
        try {
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
        }
        catch (error) {
            res.status(500).json({ message: "Error Validating Token: ", error })
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
        try {
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
        }
        catch (error) {
            res.status(500).json({ message: "Error Validating Token: ", error })
        }
    },

    checkBothAdmins: (req, res, next) => {
        try {
            var token = req.get("authorization");
            if (token) {
                token = token.split(' ')[1]
                admin.auth().verifyIdToken(token)
                    .then((claims) => {
                        if (claims.role === "Super Admin" || claims.role === "Admin") {
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
        }
        catch (error) {
            res.status(500).json({ message: "Error Validating Token: ", error })
        }

    },

    async verifyPreschool(passedId, req) {
        var token = req.get("Authorization");
        if (token) {
            token = token.split(' ')[1]
            const result = await admin.auth().verifyIdToken(token)
                .then((claims) => {
                    console.log(`Passed Preschool:${passedId} , Token Preschool:${claims.preschool_id}`);
                    if (claims.preschool_id == passedId) {
                        console.log('preschool match');
                        return true;
                    }
                    else {
                        console.log('preschool doesnt match');
                        return false;
                    }
                }).catch((error) => {
                    console.log('orror ocurred: ', error);
                    return false;
                });
            return result;
        }
        else {
            return false;
        }
    }


};

module.exports = token_validation;






