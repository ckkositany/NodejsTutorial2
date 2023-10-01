const express = require('express')
const mongoose =require('mongoose')
const dotenv=require('dotenv')
const morgan=require('morgan')
const path=require('path')
const methodOverride=require('method-override')
const passport=require('passport')
const session=require('express-session')
const {exphbs,engine}=require('express-handlebars')
const MongoStore = require('connect-mongo')
const connectDB=require('./config/db')
const { request } = require('http')

const app=express()
//load config 
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport)

 
//connecting mongoDB
  connectDB()

  //Boody parser
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())

// Method override
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

//logging

if(process.env.NODE_ENV==='development'){

    app.use(morgan('dev'))
}

//Handlebars Helpers
const {formDate,stripTags,truncate,editIcon,select}=require('./helpers/hbs')
//handlebars
app.engine('.hbs', engine({helpers:{
    formDate,
    stripTags,
    truncate,
    editIcon,
    select,
},defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
const URL ="mongodb+srv://kositanyck:KdvfaSZAzSWlHxUN@cluster0.vkepmpr.mongodb.net/storybooks?retryWrites=true"
app.use(session
  ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: URL }),
    
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//set global variable
app.use(function(req,res,next){
  res.locals.user = req.user || null
  next()
})

//static folder
//app.use(express.static('./'))
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))


const PORT = process.env.PORT || 3000
//console.log(process.env.MONGO_URI)

app.listen(PORT,console.log(`Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`))
