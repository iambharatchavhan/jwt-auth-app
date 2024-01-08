const express = require("express");
const port = 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/admin',adminRouter);






app.listen(port,()=>{
    console.log(`Backend is up, Ready to rock on port number ${port}`)
})