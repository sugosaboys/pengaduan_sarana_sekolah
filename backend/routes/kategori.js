const express = require('express');
const router = express.Router();
const db = require('../config/db');
const AuthMiddleware = require('../middleware/authmiddleware');

router.get('/',AuthMiddleware,async(req,res)=>{
    try {
        const [rows] = await db.query('SELECT * FROM kategori');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:id_kategori',AuthMiddleware,async(req,res)=>{
    try {
        const { id_kategori } = req.params;
        const [rows] = await db.query(`SELECT * FROM kategori WHERE id_kategori = ?`,[id_kategori]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({error: 'No kategori with that ID'});
    }
});

router.post('/add',AuthMiddleware,async(req,res)=>{
    try {
        const { ket_kategori } = req.body;
        await db.query(`INSERT INTO kategori (ket_kategori) VALUES (?)`, [ket_kategori]);

        if(!ket_kategori){
            return res.status(400).json({error: 'ket_kategori is required'});
        }

       res.status(201).json({message: 'New kategori added successfully'});
        
    } catch (error) {
         res.status(500).json({error: 'Failed to add new kategori, makesure not inputting same ket_kategori'});
    }
});

router.put('/update/:id_kategori',AuthMiddleware,async(req,res)=>{
    const { id_kategori } = req.params;
    const { ket_kategori } = req.body;
    try {
        const [result] = await db.query(`UPDATE kategori SET ket_kategori = ? WHERE id_kategori = ?`,[ket_kategori, id_kategori]);
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'kategori not found'});
        }
        res.status(200).json({message: '1 kategori updated successfully'});
    } catch (error) {
         res.status(500).json({error: 'Failed to update 1 kategori, makesure ket_kategori exists'});
    }
});

router.delete('/delete/:id_kategori',AuthMiddleware,async (req,res) => {
    try {
        const { id_kategori } = req.params;
        await db.query(`DELETE FROM kategori WHERE id_kategori = ?`, [id_kategori]);
        res.status(200).json({message: '1 kategori deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete 1 kategori, makesure id_kategori exists'});
    }
})

module.exports = router;