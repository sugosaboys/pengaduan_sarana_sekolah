const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { register } = require('../controller/register');
const { login } = require('../controller/login');
const { logout } = require('../controller/logout');
const { check } = require('express-validator'); 
const Validate = require('../middleware/validate');
const AuthMiddleware = require('../middleware/authmiddleware');

router.get('/getAdmin',async (req,res) => {
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({error: 'No token provided, Unauthorized access!'});
        }
        jwt.verify(token,process.env.SECRET_KEY,async (err,decoded) => {
            if(err){
               return res.status(401).json({error:'Unauthorized access!'});
            }
            try {
                const username = decoded.username;
                const [result] = await db.query(`SELECT * FROM admin WHERE username = ?`,[username]);
                res.status(200).json(result[0]);
            } catch (error) {
                 res.status(500).json({error:"Database error occurred while fetching user data!"});
            }
        })
    } catch (error) {
        res.status(500).json({error:"server error occurred!"} );
    }
});

router.get('/',AuthMiddleware,async(req,res)=>{ 
    try {
        const [rows] = await db.query('SELECT * FROM admin');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/register', 
    check("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),
    check("password")
        .isLength({min:6})
        .withMessage("Password must be at least 6 characters long"),
    Validate,
    register
);
router.post('/login', 
    check("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),
    check("password")
        .isLength({min:6})
        .withMessage("Password must be at least 6 characters long"),
    Validate,
    login
);
router.post('/logout', logout);

module.exports = router;