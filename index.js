const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware is here
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://developerszone06:C18ay89W13DQRxsk@cluster0.s7km3p2.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// all collection is here --------------

const totalServices = client.db("revive").collection("services");
const totalBlog = client.db("revive").collection("blogs");
const totalTrainers = client.db("revive").collection("trainers");
const totalUser = client.db("revive").collection("users");
const totalNotification = client.db("revive").collection("notification");
const totalEvents = client.db("revive").collection("events");

// all crud operation is here ---------------------------




// all users crud operation is here ------------
// all users crud operation is here ------

// new user post api
app.post("/users", async (req, res) => {
  const user = req.body;
  const result = await totalUser.insertOne(user);
  res.send(result);
});

// get all user api
app.get("/users", async (req, res) => {
  const users = await totalUser.find().toArray();
  res.send(users);
});

// all trainers crud operation is here -------------------

// get all trainers 
app.get('/trainers', async(req, res) => {

  if(req.query?.id){
    const query = {_id : new ObjectId(req.query.id)}
    const trainer = await totalTrainers.findOne(query)
    res.send(trainer)
  } else {
    const trainers = await totalTrainers.find().toArray()
    res.send(trainers)
  }
})





// all events crud operation is here ---------------

// get all events 
app.get('/events', async(req, res) => {

  if(req.query?.id){
    // get single event data 
    const query = {_id : new ObjectId(req.query.id)}
    const event = await totalEvents.findOne(query)
    res.send(event)

  } else {
    // get all event data 
    const events = await totalEvents.find().toArray()
    res.send(events)
  }
})
// get all trainers
app.get("/trainers", async (req, res) => {
  const trainers = await totalTrainers.find().toArray();
  res.send(trainers);
});

// all events crud operation is here ---------------

// get all events
app.get("/events", async (req, res) => {
  const events = await totalEvents.find().toArray();
  res.send(events);
});

// new notification post operation

app.patch("/notification/:email", async (req, res) => {
  const email = req.params.email;
  const notification = req.body.notificationIs;

  const result = await totalNotification.updateOne(
    { email: email },
    {
      $setOnInsert: { email: email },
      $push: {
        allNotification: {
          $each: [notification],
          $position: 0,
        },
      },
    },
    { upsert: true }
  );
  res.send(result);
});

//get all  the service

app.get("/servicesAll", async (req, res) => {
  //get the query
  const filter = req.query;
  
  const query = {
    //search by trainers name and title ..Here use or for both of them and options for case-insensitive
    $or: [
      { title: { $regex: filter.search || "", $options: "i" } },
      { trainer: { $regex: filter.search || "", $options: "i" } },
    ],
  };
  // Include category filter if available
  if (filter.category) {
    query.category = filter.category;
  }
  // if(filter.duration){
  //   const [min, max] = filter.duration.split("-");//[5,10]
  //   query.duration = { $gte: parseInt(min), $lte: parseInt(max)};
  // }

  //sort for price category
  const options = {
    sort: {
      price: filter.sort === "asc" ? 1 : -1,
    },
  };

  const services = await totalServices.find(query, options).toArray();
  res.send(services);
});

// all services api is here

app.get('/services', async (req, res) => {
    const services = await totalServices.find().toArray()
    res.send(services)
})

// get single service 
app.get('/service/:id', async (req, res) => {
    const id = req.params.id
    const query = {_id : new ObjectId(id)}
    const service = await totalServices.findOne(query)

    res.send(service)
})

app.get("/service/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const service = await totalServices.findOne(query);

  res.send(service);
});


// get all blogs----------------------------------

app.get('/blogs', async (req, res) => {

    if(req.query?.id){
      // get single blog by id 
      const query = {_id : new ObjectId(req.query.id)}
      const blogs = await totalBlog.findOne(query)
      res.send(blogs)
    } else {
      // get all blogs 
      const blogs = await totalBlog.find().toArray()
      res.send(blogs)
    }
})







app.get('/', (req, res) => {
    res.send('Revive server is running')
})
app.get("/blogs", async (req, res) => {
  const blogs = await totalBlog.find().toArray();
  res.send(blogs);
});

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const blog = await totalBlog.findOne(query);

  res.send(blog);
});

app.get("/", (req, res) => {
  res.send("Revive server is running");
});

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
