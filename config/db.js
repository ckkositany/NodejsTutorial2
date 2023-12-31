const mongoose = require('mongoose');
const dotenv=require('dotenv')
const URI = "mongodb+srv://kositanyck:KdvfaSZAzSWlHxUN@cluster0.vkepmpr.mongodb.net/storybooks?retryWrites=true";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    console.log('Error connecting to MongoDB Atlas.Please check your internet connectivity...')
    process.exit(1);
  }
};

module.exports=connectDB

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kositanyck:KdvfaSZAzSWlHxUN@cluster0.vkepmpr.mongodb.net/storybooks?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

 async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(" You successfully connected to MongoDB!");
    //Pinged your deployment.
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//connectDB().catch(console.dir);



/*
const mongoose=require('mongoose')

const connectDB= async() => {

  try{
    const conn = await mongoose.connect("mongodb+srv://kositanyck:KdvfaSZAzSWlHxUN@cluster0.vkepmpr.mongodb.net/storybooks?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  )
  console.log('test mongo')
  }
  catch(err)
  {
    console.log('db dead')
  }
   
}
*/


module.exports= connectDB
