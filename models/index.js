const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.model = {};
db.model.Users = require("./user.js");
db.model.Prescription = require("./prescription.js");
module.exports = db;
