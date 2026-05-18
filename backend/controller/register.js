const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

exports.register = async (req,res) => {
    const {username, password} = req.body;
    try {
        const [data] = await db.query(`SELECT * FROM admin WHERE username = ?` , [username]);
        const arr = data;
        if(arr.length != 0){
            return res.status(400).json({message: 'Username already exists'});
        }else{
            bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({error: "Server Error"});
                }
                const admin = {
                    username,
                    password: hash,
                };

                try {
                    db.query('INSERT INTO admin (username, password) VALUES (?, ?)',[admin.username,admin.password]);

                    const token = jwt.sign(
                            {
                                username: admin.username,
                            },
                            process.env.SECRET_KEY,
                            {expiresIn: '24h'}
                    )
                    res.cookie('admin_token',token,{
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.status(200).json({ message: "User registered successfully!" });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({error:"Database error"});
                }
        });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Database error while registering user!",
        })
    }
}