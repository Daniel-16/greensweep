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
  completedTask: {
    type: Boolean,
    // required: true,
    default: false,
  },
  reward: {
    type: Number,
    default: 500,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;
