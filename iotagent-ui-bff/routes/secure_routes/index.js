const express = require('express');
const router = express.Router();

router.get('/secret',function(req,res,next){
    res.status(200).json({message:"Secure Path reached!"});
});

module.exports = router;