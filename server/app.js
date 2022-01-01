// server/index.js
const express = require("express");

const cors = require('cors')
const env = require('dotenv')
var db = require("./config/connection");
const userRoute = require('./routes/userRoute');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 3001;
const app = express();

env.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/",userRoute);



// MongoDB connection checking
db.connect((err) => {
  if (err) console.log("Connection error " + err);
  else console.log("Database Connected to port 27017");
});

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});