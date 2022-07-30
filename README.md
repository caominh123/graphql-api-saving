<div id="top"></div>

## About The Project

Mini project with the API server to create/update user and let user to create a Savings-like order.

### Built With

* Nodejs
* Typescript
* Graphql
* Express
* MongoDB

### Installation

1. Clone the repo
   ```sh
   https://github.com/caominh123/graphql-api-saving.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
<!-- USAGE EXAMPLES -->
## Usage

### Running the app
```
yarn start
# App running on http://localhost:3000/graphql
```

### Open API Examples
1. Create user
    ```
    mutation {
        createUser(user: {full_name: "test01", phone: "0386666555", email: "", age: 12, gender: "MALE"}) {
            _id
            full_name
            age
            phone
            gender
            total_amount
        }
    }
    ```
2. Update user
    ```
    mutation {
        updateUser(user: {_id: "62e4d05f6c87ffa075aa54b8", phone: "0925908778"}) {
            _id
            full_name
            age
            phone
            gender
            total_amount
        }
    }
    ```
3. Get user
    ```
    {
        getOneUser(user: {_id: "62e4d05f6c87ffa075aa54b8"}) {
            _id
            full_name
            total_amount
        }
    }
    ```
4. Create order
    ```
    mutation {
        createOrder(order: {user: "62e4d05f6c87ffa075aa54b8", amount: 200000, interest_rate: 0.05}) {
            _id
            code
            user
            amount
            interest_rate
            accrued_amount
        }
    }
    ```
5. Get many order
    ```
    {
        getManyOrder(order: {user: "62e4d05f6c87ffa075aa54b8"}) {
            _id
            code
            amount
            accrued_amount
        }
    }
    ```
6. Get one order
    ```
    {
        getOneOrder(order: {_id: "62e4d1ee6c87ffa075aa54b9"}) {
            _id
            code
            amount
            accrued_amount
        }
    }
    ```
