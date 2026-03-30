const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const AuthMiddleware = require('../middleware/authmiddleware');

router.get('/getsiswa',async (req,res) => {
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
                const nis = decoded.nis;
                const [result] = await db.query(`SELECT * FROM siswa WHERE nis = ?`,[nis]);
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
        const [rows] = await db.query('SELECT * FROM siswa');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:nis',AuthMiddleware,async(req,res)=>{
    try {
        const { nis } = req.params;
        const [rows] = await db.query(`SELECT * FROM siswa WHERE nis = ?`,[nis]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({error: 'No siswa with that nis'});
    }
});

router.put('/update/:nis',AuthMiddleware,async (req,res) => {
    try {
        const { nis } = req.params;
        const { nama_siswa,kelas } = req.body;
        const [result] = await db.query(`UPDATE siswa SET nama_siswa = ?, kelas = ? WHERE nis = ?`,[nama_siswa, kelas, nis]);
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'siswa not found'});
        }
        res.status(200).json({message: '1 siswa updated successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update siswa data'});
    }
});

router.delete('/delete/:nis',AuthMiddleware,async (req,res) => {
    try {
        const { nis } = req.params;
        await db.query(`DELETE FROM siswa WHERE nis = ?`, [nis]);
        res.status(200).json({message: '1 siswa deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete 1 siswa, makesure nis exists'});
    }
});

module.exports = router;