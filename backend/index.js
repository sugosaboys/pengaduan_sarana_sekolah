const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.port || 5000;
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.disable('x-powered-by');

const user = require('./routes/user.js');
app.use('/user', user);

const authsiswaRoutes = require('./routes/authsiswa.js');
app.use('/authsiswa', authsiswaRoutes);

const siswaRoutes = require('./routes/siswa.js');
app.use('/siswa', siswaRoutes);

const kategoriRoutes = require('./routes/kategori.js');
app.use('/kategori', kategoriRoutes);

const aspirasiRoutes  = require('./routes/aspirasi.js');
app.use('/aspirasi',aspirasiRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});
