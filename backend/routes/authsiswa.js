const express = require('express');
const router = express.Router();
const { registersiswa } = require('../controller/registersiswa');
const { loginsiswa } = require('../controller/loginsiswa');
const { logoutsiswa } = require('../controller/logoutsiswa');
const { check } = require('express-validator');
const Validate = require('../middleware/validate');

router.post('/register', 
    check("nis")
        .trim()
        .notEmpty()
        .withMessage("nis is required"),
    check("password")
        .isLength({min:4})
        .withMessage("Password must be at least 4 characters long"),
    check("nama_siswa")
        .trim()
        .notEmpty()
        .withMessage("nama_siswa is required"),
    check("kelas")
        .trim()
        .notEmpty()
        .withMessage("kelas is required"),
    Validate,
    registersiswa
);

router.post('/login', 
    check("nis")
        .trim()
        .notEmpty()
        .withMessage("nis is required"),
    check("password")
    .isLength({min:4})
    .withMessage("Password must be at least 4 characters long"),
    Validate,
    loginsiswa
);

router.post('/logout', logoutsiswa);

module.exports = router;