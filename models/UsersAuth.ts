import mongoose, {Schema} from "mongoose";

const usersAuthSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const UsersAuth = mongoose.models.UserAuth || mongoose.model("UserAuth", usersAuthSchema);

export default UsersAuth;