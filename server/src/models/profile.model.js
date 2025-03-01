import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  dateOfBirth: Date,
  about: String,
  contact: {
    type: String,
    required: true,
    unique: true,
  },
});

const Profile = model("Profile", ProfileSchema);

export default Profile;
