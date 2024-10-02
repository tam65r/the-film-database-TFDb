const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CategorySchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true }
});

module.exports = CategorySchema;

//module.exports = mongoose.model("Category", CategorySchema);