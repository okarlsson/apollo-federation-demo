import graphqlPlaygroundMiddlewareLambda from 'graphql-playground-middleware-lambda';

exports.handler = graphqlPlaygroundMiddlewareLambda({
  endpoint: 'graphql',
});
