import mongoose from "mongoose";
import bcrypt from "bcrypt";

const VolunteerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

VolunteerSchema.pre("save", async function (next) {
  const email = this.email;
  const volunteer = await VolunteerModel.findOne({ email });
  try {
    if (volunteer) {
      const emailExists = new Error(
        "This email already exists for a volunteer"
      );
      return next(emailExists);
    }
  } catch (error) {
    throw new Error(error);
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const VolunteerModel = mongoose.model("Volunteer", VolunteerSchema);

export default VolunteerModel;
