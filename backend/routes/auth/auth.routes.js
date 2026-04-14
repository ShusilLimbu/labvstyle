const express = require('express');
const {registerUser, loginUser, logOutUser, authMiddleware, forgotPassword, resetPassword} = require('../../controllers/auth/auth.controler')

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',logOutUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/checkauth', authMiddleware, (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'User Verified',
        user
    })
})

module.exports = router;