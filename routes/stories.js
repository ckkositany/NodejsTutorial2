const express =require('express')
const router = express.Router()
const {ensureAuth}=require('../middleware/auth')
const Story=require('../models/Story')
//const { route } = require('.')

//@description show add page 
// @ route GET /stories/add
router.get('/add', ensureAuth, (req,res)=>{
    //console.log(stories)
    res.render('stories/add')
})

//@description process add form
// @ route POST /stories
router.post('/', ensureAuth, async (req,res)=>{
    // Ensure the user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect('/login'); // Redirect to login page if not authenticated
  }
  //console.log(req.body)
    try {
       
        req.body.user = req.user.id
        //console.log(`Before story.create: ${req.user}`)
        await Story.create(req.body)
        //console.log(`After story.create: ${req.user}`)
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

    //@description show edit page
// @ route GET /edit/id
router.get('/edit/:id', ensureAuth, async (req,res)=>{
  try {
    const story= await Story.findOne({
      _id: req.params.id
    })
    .lean()
        if(!story){
          return res.render('error/404')
        }
  
        if(story.user !=req.user.id){
            res.redirect('/stories')
        }
        else{
          res.render('stories/edit', {
            story,
          })
        }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
  

})

//@description Update story
// @ route PUT /stories/id
router.put('/:id', ensureAuth, async (req,res)=>{
  try {
    let story =await Story.findById(req.params.id).lean()
 // console.log(`Before edit: ${story}`)

    if(!story){
      res.render('error/404')
    }
    if(story.user !=req.user.id){
      res.redirect('/stories')
    }else{
      story= await Story.findByIdAndUpdate({ _id: req.params.id}, req.body,{
        new: true,
        runValidators: true,
      },
     // console.log(`After edit: ${story}`)
)
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
  
})

  //@description DELETE story
// @ route DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req,res)=>{
  try {
    await Story.deleteOne({_id: req.params.id})
    console.log('Story deleted')
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports=router