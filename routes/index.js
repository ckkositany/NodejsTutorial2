const express=require('express')
const router=express.Router()
const {ensureAuth,ensureGuest}=require('../middleware/auth')
const Story=require('../models/Story')
//@description: login/landing page
//@route GET /

router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout: 'logins'
    })
})


//@description: /Dashboard
//@route GET /dashboard

router.get('/dashboard',ensureAuth, async (req,res)=>{

    try {
        const stories = await Story.find({ user: req.user.id }).lean();
        // console.log(req.user.id)
        //  console.log(req.user)
        //  console.log(stories);
        if (stories.length === 0) {
            console.log('No stories found for the user.');
        } 
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
    
    // try {
    //     const stories= await Story.find({user: req.user.id}).lean()
    //     console.log(stories)
    //     res.render('dashboard', {
    //         name: req.user.firstName,
    //         stories,
    //     })
    // } catch (err) {
    //     console.error(err)
    //     res.render('error/500')
    // }
    // //console.log(req.user)
   
})


module.exports=router