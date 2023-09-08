const express = require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const path=require('path')
const passport=require('passport')
const session=require('express-session')
const {exphbs,engine}=require('express-handlebars')
const connectDB=require('./config/db')

//load config 
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport)

 // Adjust the path as needed
//connecting mongoDB
async function main() {
  try {
    await connectDB();
    // Your code that depends on the MongoDB connection goes here
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();




//logging
const app=express()
if(process.env.NODE_ENV==='development'){

    app.use(morgan('dev'))
}

//handlebars
app.engine('.hbs', engine({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
   
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
