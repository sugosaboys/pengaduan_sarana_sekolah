const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

exports.loginsiswa = async (req,res)=>{
    const {nis, password} = req.body;
    try {
        const [data] = await db.query(`SELECT * FROM siswa WHERE nis = ?`,[nis]);
        const user = data;
        if(user.length === 0){
            return res.status(400).json({error:"nis is not registered, Sign Up first"});
        }else{
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    res.status(500).json({error:"Server Error"});
                }else if(result === true){
                    const token = jwt.sign(
                        {
                            nis:nis,
                        },
                        process.env.SECRET_KEY,
                        {expiresIn: '24h'}
                    );
                    res.cookie('siswa_token',token, {
                       httpOnly: true,
                       secure: process.env.NODE_ENV === 'production', 
                       sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                       maxAge: 24 * 60 * 60 * 1000,
                    });
                    res.clearCookie('admin_token', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', 
                        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                        maxAge: 0,
                    });
                    res.status(200).json({ message:"Siswa signed in!" });
                }else{
                    if(result != true)
                    res.status(400).json({error:"Enter correct password!"});
                }
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Database error occurred while signing in!",
        })
    }
}