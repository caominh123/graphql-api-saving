/**
 * The resolvers responsible to handle business logic
 */
import {
  OrderResult,
  CreateOrderInput,
  GetManyOrder,
  GetOneOrder,
} from "../../interfaces/order.interface";
import User from "../../models/user";
import Order from "../../models/order";
import { get, round, omit } from "lodash";
import generatePassword from "password-generator";
import {
  UserResult,
  CreateUserInput,
  UpdateUserInput,
  GetOneUser,
} from "../../interfaces/user.interface";

const resolvers = {
  /**
   * @remark Get one user by _id
   */
  getOneUser: async (args: { user: GetOneUser }): Promise<UserResult> => {
    try {
      const { _id } = args.user;
      const user = await User.findOne({ _id });
      const sum_val = await Order.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: null, sum: { $sum: "$amount" } } },
      ]);
      return {
        ...user._doc,
        total_amount: !get(sum_val[0], "sum") ? 0 : get(sum_val[0], "sum"),
      };
    } catch (error) {
      throw error;
    }
  },
  /**
   * @remark Create a new user
   */
  createUser: async (args: { user: CreateUserInput }): Promise<UserResult> => {
    try {
      const { full_name, phone, email, age, gender } = args.user;
      if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone) === false) {
        throw Error("PHONE_NUMBER_ERROR");
      }
      const user = new User({
        full_name,
        phone,
        email,
        age,
        gender,
      });
      const newUser = await user.save();
      return { ...newUser._doc, total_amount: 0 };
    } catch (error) {
      throw error;
    }
  },
  /**
   * @remark Update user info
   */
  updateUser: async (args: { user: UpdateUserInput }): Promise<UserResult> => {
    try {
      const { _id, full_name, phone, email, age, gender } = args.user;
      const exist = await User.findOne({ _id: _id });
      if (!exist) {
        throw new Error("User Not Found");
      }
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { ...omit(args.user, ["_id"]) }
      );
      if (!user) {
        throw new Error("error");
      }
      const sum_val = await Order.aggregate([
        { $match: { user: user._id } },
        { $group: { _id: null, sum: { $sum: "$amount" } } },
      ]);
      return {
        ...(await User.findOne({ _id: _id }))._doc,
        total_amount: !get(sum_val[0], "sum") ? 0 : get(sum_val[0], "sum"),
      };
    } catch (error) {
      throw error;
    }
  },
  /**
   * @remark Create a new order
   */
  createOrder: async (args: {
    order: CreateOrderInput;
  }): Promise<OrderResult> => {
    try {
      const code = generatePassword(5, false, /\d/);
      const { user, amount, interest_rate } = args.order;

      const accrued_amount: number[] = [];
      let accrued_amount_temp: number = amount;
      for (let index = 0; index < 12; index++) {
        accrued_amount_temp =
          accrued_amount_temp + accrued_amount_temp * (interest_rate / 12);
        accrued_amount.push(round(accrued_amount_temp));
      }

      const order = new Order({
        user,
        amount,
        interest_rate,
        code,
        accrued_amount,
      });
      const newOrder = await order.save();
      return newOrder;
    } catch (error) {
      throw error;
    }
  },
  /**
   * @remark Get many order by user
   */
  getManyOrder: async (args: {
    order: GetManyOrder;
  }): Promise<OrderResult[]> => {
    try {
      const { user } = args.order;
      const orders = await Order.find({ user });
      return orders;
    } catch (error) {
      throw error;
    }
  },
  /**
   * @remark Get one order by _id
   */
  getOneOrder: async (args: { order: GetOneOrder }): Promise<OrderResult> => {
    try {
      const { _id } = args.order;
      const order = await Order.findOne({ _id });
      return order;
    } catch (error) {
      throw error;
    }
  },
};

export default resolvers;
