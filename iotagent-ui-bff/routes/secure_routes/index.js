const express = require('express');
const router = express.Router();

router.get('/secret',function(req,res,next){
    res.status(200).json({message:"Secure Path reached!"});
});

router.get('/agent',function(req,res,next){
    res.status(200).json({message:"GET /agent reached!"});
});

router.post('/agent',function(req,res,next){
    res.status(200).json({message:"POST /agent reached!"});
});

router.get('/agent/:idAgent',function(req,res,next){
    res.status(200).json({message:"GET /agent reached!"});
});

router.put('/agent/:idAgent',function(req,res,next){
    res.status(200).json({message:"PUT /agent reached!"});
});

router.delete('/agent/:idAgent',function(req,res,next){
    res.status(200).json({message:"DELETE /agent reached!"});
});

module.exports = router;