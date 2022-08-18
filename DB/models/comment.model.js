const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;





