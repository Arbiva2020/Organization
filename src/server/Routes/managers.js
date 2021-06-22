require("../db/db"); // data from the dataBase.js
const express = require("express");
const router = express.Router();
const managerModel = require("../Models/manager");
// const salt = 10;

router.get("/", (req, res) => {
  managerModel.find({}, (err, documents) => {
    err ? res.status(500).send("error") : res.status(200).send(documents);
  });
});

router.get("/:id", (req, res) => {
  managerModel.find({ _id: req.params.id }, (err, documents) => {
    err ? res.status(500).send("error") : res.status(200).send(documents);
  });
});

router.put("/update", (req, res) => {
  managerModel.findOneAndUpdate(
    { _id: req.body._id },
    { $set: req.body },
    (err, doc) => {
      err ? res.status(500).send("error") : res.status(200).send("Updated");
    }
  );
});

module.exports = router;
