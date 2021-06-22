// we need a model that allowes us to work with the specific entity of the database

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  image: String,
  position: String,
  managerFirstName: String,
  managerLastName: String,
  managerID: "string",
  tasks: Array,
  reports: Array,
});

module.exports = mongoose.model("employees", employeeSchema); //"employee" is the name of the db from mongodb
