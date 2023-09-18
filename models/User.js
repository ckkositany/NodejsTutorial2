const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', UserSchema)

/*
const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

// // Define another schema that references the User model
// const anotherSchema = new mongoose.Schema({
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },
//     // ...other fields for this schema
//   });
  
module.exports=mongoose.model('User',userSchema,)

*/