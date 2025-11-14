const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("this is a users route")
})

router.get('/101',(req,res)=>{
    res.send("this is users route on 101")
})

module.exports = router