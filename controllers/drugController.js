const Drugs = require("../models/drugs");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    Drugs.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    Drugs.find({ user: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Drugs.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Drugs.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
      console.log("We are updating the time :" , req.body)
    Drugs.findOneAndUpdate({ _id: req.params.id }, {$set: {lastTakenDate: req.body.lastTakenDate, lastTakenTime: req.body.lastTakenTime}})
      .then(dbModel => {
          console.log("DATABASE UPDATED: ", dbModel)
          res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Drugs.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
