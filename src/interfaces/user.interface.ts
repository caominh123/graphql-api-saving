/**
 * Define all the interfaces related to user
 */
export interface UpdateUserInput {
  _id: string;
  full_name?: String;
  phone?: String;
  email?: String;
  age?: number;
  gender?: String;
}

export interface UserResult {
  _id: string;
  full_name: string;
  phone: string;
  age: number;
  gender: string;
  total_amount: number;
}

export interface CreateUserInput {
  full_name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
}

export interface GetOneUser {
  _id: string;
}
