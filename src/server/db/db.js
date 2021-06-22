//code snipped. allowes us to connect to the database using the mongoose package.
//i connect it to every file where i need the database, so we put it in a file
//that we import evertime we need the connection (instead of copy-paste it)

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Organization", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To Mongodb"));
