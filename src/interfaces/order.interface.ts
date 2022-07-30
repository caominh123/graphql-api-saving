/**
 * Define all the interfaces related to order
 */
export interface OrderResult {
  _id: string;
  code: string;
  user: string;
  amount: number;
  interest_rate: number;
  accrued_amount: number[];
}

export interface CreateOrderInput {
  user: string;
  amount: number;
  interest_rate: number;
}

export interface GetOneOrder {
  _id: string;
}

export interface GetManyOrder {
  user: string;
}
