//the server definitions:
const express = require("express");
const cors = require("cors");
//importing routes for all server componenets:
const employeesRoutes = require("./Routes/employees"); //for routing
const managersRoutes = require("./Routes/managers"); //for routing
const app = express(); //for running the server
const path = require("path");

//in order to run the server we use express:
app.use(express.json()); //we want the server to know how to handle the json from the body
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3001;

//calling all paths by creating app middlewares:
app.use("/employees", employeesRoutes); // everything in the items.js route will have the prefix "/items"
app.use("/managers", managersRoutes); // everything in the products.js route will have the prefix "/products"

//the server we listen to:
app.listen(PORT, () => console.log("server is runing on port: " + PORT));
