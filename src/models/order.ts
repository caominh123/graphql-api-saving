/**
 * Create an Order model with mongoose
 */
import { Schema, model, Model, Document } from "mongoose";

/**
 * @remark Define the order interface
 */
export interface IOrder extends Document {
  user: string;
  code: string;
  amount: number;
  interest_rate: number;
  accrued_amount: number[];
}

/**
 * @remark Define the order schema
 */
const orderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    code: {
      type: String,
      required: true,
      unique: true,
      max: 5,
      min: 5,
    },
    amount: {
      type: Number,
      required: false,
    },
    interest_rate: {
      type: Number,
      required: false,
    },
    accrued_amount: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
