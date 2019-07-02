# Apollo Federation Example

A simple demo for Apollo Federation

## Getting started

Install serverless framework globally

```
npm install serverless -g
```

Install dependencies in each micro-service

```
npm install
```

Run the service locally with serverless offline

```
sls offline start
```

## Run Queries

Run any of these example queries as localhost:4000/playground

```
query MyReviews{
  me {
    username
    reviews {
      body
      product {
        name
        upc
      }
    }
  }
}
```

```
query TopProducts{
  topProducts{
    name
    reviews{
      author{
        name
      }
    }
  }
}
```
