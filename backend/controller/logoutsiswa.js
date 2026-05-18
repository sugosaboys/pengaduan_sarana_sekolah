exports.logoutsiswa = async (req,res) => {
    try {
        res.cookie('siswa_token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
            maxAge: 0,
        });
        res.status(200).json({message:"User logged out successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server error occurred while logging out!"});   
    }
}