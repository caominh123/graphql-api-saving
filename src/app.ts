/**
 * The endpoint that creates a server and runs the app
 */
import express, { Application } from "express";
import mongoose from "mongoose";
import graphqlSchema from "./graphql/schema";
import graphqlResolvers from "./graphql/resolvers";
import graphqlHTTP from "express-graphql";
require("dotenv").config();

const app: Application = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

const uri = process.env.MONGO_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(process.env.SERVER_PORT, () => console.log("Server is running"))
  )
  .catch((error) => {
    throw error;
  });