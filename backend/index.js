const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
 const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.port || 5000;
app.set('trust proxy', 1);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.disable('x-powered-by');

 const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 20,
      message: { error: "Too many login attempts, try again later." },
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
         const key = req.user?.id || req.ip;
         //console.log(`Rate limit key: ${key}`);
         return key; 
      }

 });

const user = require('./routes/user.js');
app.use('/user/login', authLimiter);
app.use('/user', user);

const authsiswaRoutes = require('./routes/authsiswa.js');
app.use('/authsiswa/login', authLimiter);
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
