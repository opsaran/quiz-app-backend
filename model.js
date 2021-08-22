const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/quizappdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind());
db.once("open", function () {
  //we are connected
});

const Schema = mongoose.Schema;

const CreatorSchema = new Schema({
  creator: { type: String, required: true },
  topic: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      q_id: { type: Number, required: true },
      correctanswerid: { type: Number, required: true },
      options: [
        { option: { type: String, required: true } },
        { option: { type: String, required: true } },
        { option: { type: String, required: true } },
        { option: { type: String, required: true } },
      ],
    },
  ],
});

const Creator = mongoose.model("creator", CreatorSchema);

const UserSchema = new Schema({
  topic: { type: String, required: true },
  name: { type: String, required: true },
  corrects: { type: Number, required: true },
  outof: { type: Number, required: true },
  percentagescore: { type: Number, required: true },
});

const User = mongoose.model("user", UserSchema);
module.exports = { Creator, User };
