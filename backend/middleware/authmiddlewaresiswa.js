const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.siswa_token;
        if(!token){
            return res.status(403).json({message:'access denied'});
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid Token'});
    }
}