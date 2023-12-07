const admin = require('./firebase.config')

const token_validation = {
    //must log-in (no matter what is the role to access the endpoint)
    checkToken: (req, res, next) => {
        var token = req.get("authorization"); 
        if (token) {
            token = token.split(' ')[1]
            const decoded = admin.auth().verifyIdToken(token) 
            if (decoded) {
                next();
            }
            else {
                res.status(401).json({ message: "Access Denied! Invalid Token." });
            }
        }
        else {
            res.status(401).json({ message: "Access Denied! Unauthorized User." })
        }
    },

    //protect staff only endpoints 
    checkStaff: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    console.log("token:",token)
                    console.log("claims:",claims)
                    if (claims.role === "Staff") {
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

    //protect admin only endpoints
    checkAdmin: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    console.log("token:",token)
                    console.log("claims:",claims)
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

    //protect parent only endpoints
    checkParent: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    console.log("token:",token)
                    console.log("claims:",claims)
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

    //protect teachers only endpoints
    checkTeacher: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    console.log("token:",token)
                    console.log("claims:",claims)
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
    
    //protect super admin only endpoints
    checkSuperAdmin: (req, res, next) => {
        var token = req.get("authorization");
        if (token) {
            token = token.split(' ')[1]
            admin.auth().verifyIdToken(token)
                .then((claims) => {
                    console.log("token:",token)
                    console.log("claims:",claims)
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






