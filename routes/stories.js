const express =require('express')
const router = express.Router()
const {ensureAuth}=require('../middleware/auth')
const Story=require('../models/Story')
const { route } = require('.')

//@description show add page 
// @ route GET /stories/add
router.get('/add', ensureAuth, (req,res)=>{
    //console.log(stories)
    res.render('stories/add')
})

//@description process add form
// @ route POST /stories
router.post('/', ensureAuth, async (req,res)=>{
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
//@description show all stories
// @ route GET /stories
router.get('/', ensureAuth, async (req,res)=>{
    try {
        const stories = await Story.find({ status: 'public' })
          .populate('user')
          .sort({ createdAt: 'desc' })
          .lean()
          .exec()
            //console.log(stories)
        res.render('stories/index', {
          stories,
        })
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
    })

module.exports=router