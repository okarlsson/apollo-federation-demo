import { ApolloServer } from "apollo-server-lambda";
import { ApolloGateway } from "@apollo/gateway";

const gateway = new ApolloGateway({
  serviceList: [
    { name: "accounts", url: "http://localhost:4001/graphql" },
    { name: "products", url: "http://localhost:4002/graphql" },
    { name: "reviews", url: "http://localhost:4003/graphql" }
  ]
});

const createServer = async () => {
  const { schema, executor } = await gateway.load();

  return new ApolloServer({
    schema,
    executor
  }).createHandler();
};

exports.handler = (event, context, callback) => {
  createServer().then(handler => handler(event, context, callback));
};
