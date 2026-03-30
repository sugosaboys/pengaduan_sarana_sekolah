const express = require('express');
const router = express.Router();
const db = require('../config/db');
const AuthMiddleware = require('../middleware/authmiddleware');

router.get('/',AuthMiddleware,async (req,res) => {
    try {
        const [aspirasi] = await db.query(`
            SELECT 
            a.id_aspirasi, 
            a.nis,
            s.nama_siswa, 
            a.id_kategori,
            k.ket_kategori,
            a.id_admin,
            ad.username AS admin_username,
            a.lokasi, 
            a.isi_aspirasi,
            a.status,
            a.feedback,
            a.created_at,
            a.updated_at
            FROM aspirasi a
            INNER JOIN siswa s ON a.nis = s.nis
            INNER JOIN kategori k ON a.id_kategori = k.id_kategori
            LEFT JOIN admin ad ON a.id_admin = ad.id_admin
            ORDER BY a.created_at DESC
        `);
        res.status(200).json(aspirasi);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/siswa',AuthMiddleware,async(req,res)=>{
    try {
        const nis = req.user.nis;
        const [rows] = await db.query(`
            SELECT 
            a.id_aspirasi, 
            a.nis,
            s.nama_siswa, 
            a.id_kategori,
            k.ket_kategori,
            a.id_admin,
            ad.username AS admin_username,
            a.lokasi, 
            a.isi_aspirasi,
            a.status,
            a.feedback,
            a.created_at,
            a.updated_at
            FROM aspirasi a
            INNER JOIN siswa s ON a.nis = s.nis
            INNER JOIN kategori k ON a.id_kategori = k.id_kategori
            LEFT JOIN admin ad ON a.id_admin = ad.id_admin
            WHERE a.nis = ?
            ORDER BY a.created_at DESC
        `,[nis]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:id_aspirasi',AuthMiddleware,async (req,res) => {
    try {
        const { id_aspirasi } = req.params;
        const [rows] = await db.query(`
            SELECT 
            a.id_aspirasi, 
            a.nis,
            s.nama_siswa, 
            a.id_kategori,
            k.ket_kategori,
            a.id_admin,
            ad.username AS admin_username,
            a.lokasi, 
            a.isi_aspirasi,
            a.status,
            a.feedback,
            a.created_at,
            a.updated_at
            FROM aspirasi a
            INNER JOIN siswa s ON a.nis = s.nis
            INNER JOIN kategori k ON a.id_kategori = k.id_kategori
            LEFT JOIN admin ad ON a.id_admin = ad.id_admin
            WHERE a.id_aspirasi = ?
        `
        ,[id_aspirasi]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({error: 'No aspirasi with that ID'});
    }
});

router.post('/admin/add',AuthMiddleware,async (req,res) =>{
    try {
        const { nis,id_kategori,id_admin,lokasi,isi_aspirasi,status,feedback } = req.body;
        await db.query(`INSERT INTO aspirasi (nis, id_kategori, id_admin, lokasi, isi_aspirasi ,status,feedback) VALUES (?,?,?,?,?,?,?)`,[nis,id_kategori,id_admin,lokasi,isi_aspirasi,status,feedback]);

        if(!nis || !id_kategori || !lokasi || !isi_aspirasi){
            return  res.status(400).json({error: 'All fields are required'});
        }

        res.status(201).json({message: 'New aspirasi added successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to add new aspirasi, makesure inputting correct aspirasi'});
    }
});

router.post('/siswa/add',AuthMiddleware,async (req,res) =>{
    try {
        const { nis,id_kategori,lokasi,isi_aspirasi } = req.body;
        await db.query(`INSERT INTO aspirasi (nis,id_kategori,lokasi,isi_aspirasi) VALUES (?,?,?,?)`,[nis,id_kategori,lokasi,isi_aspirasi]);

        if(!nis || !id_kategori || !lokasi || !isi_aspirasi){
            return  res.status(400).json({error: 'All fields are required'});
        }

        res.status(201).json({message: 'New aspirasi added successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to add new aspirasi, makesure inputting correct aspirasi'});
    }
});

router.put('/admin/update/:id_aspirasi',AuthMiddleware,async (req,res) => {
    try {
        const AspirasiID = req.params.id_aspirasi;
        const {nis,id_kategori,id_admin,lokasi,isi_aspirasi,status,feedback }  = req.body;
        const result = await db.query(`
            UPDATE aspirasi SET nis = ? ,id_kategori = ?,id_admin = ?,lokasi = ?,isi_aspirasi = ?,status = ?,feedback = ? WHERE id_aspirasi = ?`
            ,[nis,id_kategori,id_admin,lokasi,isi_aspirasi,status,feedback,AspirasiID]
        );
        if(result.length === 0){
            return res.status(404).json({error: 'aspirasi not found'});
        }
        res.status(200).json({message:'1 aspirasi updated successfuly'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update aspirasi, makesure inputting correct aspirasi'});
    }
});

router.put('/siswa/update/:id_aspirasi',AuthMiddleware,async (req,res) => {
    try {
        const AspirasiID = req.params.id_aspirasi;
        const { nis, id_kategori , lokasi , isi_aspirasi } = req.body;
        const result = await db.query(`
            UPDATE aspirasi SET nis = ?, id_kategori = ?, lokasi = ?, isi_aspirasi = ? WHERE id_aspirasi = ? `
            ,[nis,id_kategori,lokasi,isi_aspirasi,AspirasiID]
    );
    if(result.length === 0){
        return res.status(404).json({error: 'aspirasi not found'});
    }
    res.status(200).json({message:'1 aspirasi updated successfuly'});
    } catch (error) {
        res.status(500).json({error: 'Failed to update aspirasi, makesure inputting correct aspirasi'});
    }
});

router.delete('/delete/:id_aspirasi',AuthMiddleware,async (req,res) => {
    try {
        const AspirasiID = req.params.id_aspirasi;
        await db.query(`DELETE FROM aspirasi WHERE id_aspirasi = ?`,[AspirasiID]);
        res.status(200).json({message:'1 aspirasi deleted successfuly'});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete aspirasi'});
    }
});

module.exports = router;