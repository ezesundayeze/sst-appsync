 const mongoose = require("mongoose");

 const TodoSchema = new mongoose.Schema({
     description: String,
     checked: Boolean
 });
 
 module.exports =  mongoose.model('Todo', TodoSchema)