const express = require('express')
const app = express()
const TestAPi = require("./models/jobs")
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
// console.log(process.env.DB_USER)
console.log(`running on port ${port}`)

//middleware
app.use(express.json())
app.use(cors())

//user: Christine
//password: B5b9Kq261HiKRyof
//ipaddress: 196.202.207.49/32
//ip name: My IP Address



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb://localhost:27017`
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSSWORD}@job-portal-server.pe3pwyu.mongodb.net/?retryWrites=true&w=majority&appName=Job-portal-server`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create  db
    const db = client.db("myJobBlog");
    const jobsCollections = db.collection("demoJobs");


  //post a job
  // app.post('/post-job', async (req, res) => {
  //   const body = req.body;
  //   body.CreateAt = new Date();
  //   // console.log(body)
  //    const result = await jobsCollections.insertOne(body);
  //    if(result.insertedId){
  //     return res.status(200).send(result);
  //    }else{
  //     return res.status(404).send({
  //       message: "Failed to create job",
  //       status: false
  //     })
  //    }
  // })


  // Assuming you're using Express.js
  app.get('/',(req,res)=>{
    res.send("hello world")
  })
app.post('/post-job', async (req, res) => {
  const job = req.body; // Assuming job data is sent in the request body
  try {
      const result = await jobsCollections.insertOne(job);
      res.status(201).json({ message: 'Job created successfully', data: result });
  } catch (error) {
      res.status(500).json({ message: 'Failed to create job', error: error.message });
  }
});


   //get all jobs
   app.get("/alljobs", async (req, res) => {
    // No need to convert it to an array it to an array
    // const jobs = await db.demoJobs.find()
     //  const jobs = await TestAPi.find() ;
     const jobs = await jobsCollections.find();
     // Print returned documents
     const Alljobs = []
     for await (const doc of jobs) {
      // console.log(doc)
       Alljobs.push(doc);
     }
    res.json(Alljobs);  
})

//get jobs using id
app.get("/all-jobs/:id", async(req, res) =>{
  const id = req.params.id;
  const job = await jobsCollections.findOne({_id: new ObjectId(id)})
  res.json(job);
})

//get jobs by email
   app.get("/myJobs/:email", async(req, res) =>{
    const email =req.params.email
    // console.log(email)
    //  postedBy: 'wangecichristine39@gmail.com'
     const jobs = await jobsCollections.find({ postedBy:email}) ;
    // console.log(jobs.doc)
     const Alljobs = []
     for await (const doc of jobs) {
       Alljobs.push(doc);
     }

     res.json(Alljobs);
   })

   //delete a job
   app.delete("/job/:id", async(req, res) =>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const result = await jobsCollections.deleteOne(filter);
    res.send(result);
   
   })

   //UPDATE JOBS
   app.patch("/update-job/:id", async(req, res) =>{
    const id = req.params.id;
    const jobData = req.body;
    const filter = {_id: new ObjectId(id)}
    const options = {upsert: true};
    const updateDoc = {
      $set: {
        ...jobData
      },
    };
    const result = await jobsCollections.updateOne(filter, updateDoc, options);
    res.json(result);
   
   })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Developer!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})