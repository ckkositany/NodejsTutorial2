const express =require('express')
const router = express.Router()
const {ensureAuth}=require('../middleware/auth')
const Story=require('../models/Story')
const { route } = require('.')

//@description show add page 
// @ route GET /stories/add
router.get('/add', ensureAuth, (req,res)=>{
    res.render('stories/add')
})

//@description process add form
// @ route GET /stories/add
router.get('/add', ensureAuth, (req,res)=>{
    res.render('stories/add')
})

module.exports=router