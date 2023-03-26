// importing main modules 
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// database connection 

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((i) => {
    console.log('Connected to MongoDB database.', process.env.DB);
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB database: ' + err);
  });


// importing route for different modules below
const userRoutes = require('./modules/user/router/user.routes');
const masterMappingRoutes = require('./modules/mastermapping/routes/mastermapping.routes');



const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use('/search', userRoutes)
app.use('/master', masterMappingRoutes)
const port = 3000

app.get('/', async (req, res) => {
  res.status(200).send({ output: "api to query 750 million records" })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// extra function

async function dateDiff(x, y) {
  let diff = new Date(y).getTime() - new Date(x).getTime()

  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
}