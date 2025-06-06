const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mealId: {
      type: String, // e.g., "52772" from TheMealDB
      required: true,
    },
    mealName: String,
    mealThumb: String,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Saved", savedSchema);
