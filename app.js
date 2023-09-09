const express = require('express')
const mongoose =require('mongoose')
const dotenv=require('dotenv')
const morgan=require('morgan')
const path=require('path')
const passport=require('passport')
const session=require('express-session')
const {exphbs,engine}=require('express-handlebars')
const MongoStore = require('connect-mongo').default;
const connectDB=require('./config/db')
const { request } = require('http')

//load config 
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport)

 
//connecting mongoDB
  connectDB()


//logging
const app=express()
if(process.env.NODE_ENV==='development'){

    app.use(morgan('dev'))
}

//handlebars
app.engine('.hbs', engine({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
/*
let store= MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collections: "sessions"
})
*/
app.use(session
  ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //store :store
   
  }))



//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

const PORT = process.env.PORT || 3000
//console.log(process.env.MONGO_URI)

app.listen(PORT,console.log(`Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`))
