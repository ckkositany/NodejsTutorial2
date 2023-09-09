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
        res.redirect('/dashboard')
    }
)

//description log out user
//route /auth/logout

route.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})


module.exports=router