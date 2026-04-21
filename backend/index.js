const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require('cors');
const {router } = require("./routes/routes.js");

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
connectDB();

app.use('/user', router);

app.listen(port, ()=>{
    console.log(`The App is running on port ${port}`)
})