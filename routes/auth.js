const express=require('express')
const passport = require('passport')
const { route } = require('.')
const router=express.Router()


//@description: login/landing page
//@route GET /auth/google

router.get('/google',passport.authenticate('google',{ scope: ['profile'] }) )



//@description: Google auth callback
//@route GET /auth/google/callback

router.get('/google/callback',
    passport.authenticate('google',{failureRedirect: '/'}),
    (req,res)=>{
        //console.log(req.user)
        res.redirect('/dashboard')
    }
)

//description log out user
//route /auth/logout

router.get('/logout',(req,res)=>{
    //console.log(req.logOut)
    //console.log(req.logout)
    req.logout
    
    res.redirect('/')
})


module.exports=router