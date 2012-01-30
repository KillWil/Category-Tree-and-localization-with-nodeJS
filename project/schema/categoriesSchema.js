
/*
      Mongoose schema model for categories
      Unique key : Title
*/

(function() {
  var Categories, Locale, ObjectId, Schema, mongoose;

  mongoose = require("mongoose");

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  Locale = new Schema({
    Lang: {
      type: String,
      lowercase: true,
      required: true
    },
    Title: {
      type: String,
      lowercase: true,
      required: true
    }
  });

  Categories = new Schema({
    Title: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    Level: {
      type: Number
    },
    LB: {
      type: Number
    },
    RB: {
      type: Number
    },
    Locale: [Locale]
  });

  module.exports = mongoose.model("Categories", Categories);

}).call(this);
