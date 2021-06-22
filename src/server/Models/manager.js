// we need a model that allowes us to work with the specific entity of the database

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const managerSchema = new Schema({
  firstName: String,
  lastName: String,
  image: String,
  position: String,
  manager: String,
  reportsSend: Array,
  reportsRecieved: Array,
  tasksSend: Array,
  tasksRecieved: Array,
  subordinates: Array,
});

module.exports = mongoose.model("managers", managerSchema); //according to the names in mongo
//"" name must be the same as mongoose collection
