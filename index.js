const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


// middleware is here
app.use(cors())
app.use(express.json())





const uri = "mongodb+srv://developerszone06:C18ay89W13DQRxsk@cluster0.s7km3p2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







const totalServices = client.db('revive').collection('services')
const totalBlog = client.db('revive').collection('blogs')


// get all services 

app.get('/services', async (req, res) => {
    const services = await totalServices.find().toArray()
    res.send(services)
})


app.get('/service/:id', async (req, res) => {
    const id = req.params.id
    const query = {_id : new ObjectId(id)}
    const service = await totalServices.findOne(query)

    res.send(service)
})



// get all blogs

app.get('/blogs', async (req, res) => {
    const blogs = await totalBlog.find().toArray()
    res.send(blogs)
})


app.get('/blog/:id', async (req, res) => {
  const id = req.params.id
  const query = {_id : new ObjectId(id)}
  const blog = await totalBlog.findOne(query)

  res.send(blog)
})







app.get('/', (req, res) => {
    res.send('Revive server is running')
})

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})