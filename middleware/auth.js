module.exports={
    ensureAuth: function(req,res,next){
       //console.log(`Before auth: ${req.user.id}`)
        if(req.isAuthenticated()){
           // console.log(`User is authenticatedis: ${req.user.id}`)
            return next()
        }
        else{
            res.redirect('/')
        }
    },
    ensureGuest: function(req,res,next) {
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }
        else{
            return next()
        }
        
    }
}