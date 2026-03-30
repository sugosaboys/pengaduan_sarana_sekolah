exports.logout = async (req,res) => {
    try {
        res.cookie('token','',{maxAge:0});
        res.status(200).json({message:"User logged out successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Server error occurred while logging out!"});   
    }
}