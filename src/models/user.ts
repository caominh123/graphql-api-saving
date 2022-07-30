/**
 * Create a User model with mongoose
 */
import { Schema, model, Model, Document } from "mongoose";

/**
 * @remark Define the user interface
 */
export interface IUser extends Document {
  full_name: string;
  phone: string;
  age: number;
  email: string;
  gender: string;
}

/**
 * @remark Define the user schema
 */
const userSchema: Schema = new Schema<IUser>(
  {
    full_name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
