import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  completeTask: {
    type: Boolean,
    // required: true,
    default: false,
  },
  reward: {
    type: Number,
    default: 1000,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
