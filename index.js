const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


// middale ware
app.use(cors())
app.use(express.json())

// Assaignment-10project
// VV5j5K6px4TEIPOq
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)


// const uri = "mongodb+srv://Assaignment-10project:VV5j5K6px4TEIPOq@cluster0.bkdyuro.mongodb.net/?retryWrites=true&w=majority";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bkdyuro.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    const Sliderdata = client.db("Brandhaven").collection("Sliderdata");
    const brandcart = client.db("Brandhaven").collection('brandcart')
    const addCart = client.db("Brandhaven").collection('addCart')

    app.get("/brand", async (req, res) => {
      const cursor = Sliderdata.find({});
      const result = await cursor.toArray();
      res.send(result)
    });
    app.get("/brand/:brandName", async (req, res) => {
      const brandName = req.params.brandName;
      const query = { brandName: brandName }
      const sliderdata = await Sliderdata.findOne(query)
      res.send(sliderdata)
    })
    app.post('/cart', async (req, res) => {
      const carts = req.body
      const result = await brandcart.insertOne(carts)
      res.send(result)
    })

    app.get('/cart', async (req, res) => {
      const cursor = brandcart.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    
    app.get('/cart/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await brandcart.findOne(query)
      res.send(result)
    })
   
    app.post('/addtocard', async (req, res) => {
      const card = req.body
      const result = await addCart.insertOne(card)
      res.send(result)
    })
    app.get('/addtocard', async (req, res) => {
      const cursor = addCart.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    
    
     
  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('e-commers server is running ')
})



app.listen(port, () => {
  console.log(`e-commerce server is running on port:${port}`);
})


