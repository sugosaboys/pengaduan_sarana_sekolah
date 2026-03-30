const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.registersiswa = async (req,res) => {
    const {nis, password , nama_siswa , kelas} = req.body;
    try {
        const [data] = await db.query(`SELECT * FROM siswa WHERE nis = ?` , [nis]);
        const arr = data;
        if(arr.length != 0){
            return res.status(400).json({message: 'nis already exists'});
        }else{
            bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    res.status(err).json({error: "Server Error"});
                }
                const siswa = {
                    nis,
                    password: hash,
                    nama_siswa,
                    kelas
                };

                try {
                    db.query('INSERT INTO siswa (nis, password,nama_siswa,kelas) VALUES (?, ?, ?, ?)',[siswa.nis,siswa.password,siswa.nama_siswa,siswa.kelas]);

                    const token = jwt.sign(
                            {
                                nis: siswa.nis,
                            },
                            process.env.SECRET_KEY,
                            {expiresIn: '24h'}
                    )
                    res.status(200).send({message: "User registered successfully"});
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