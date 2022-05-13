# Storefront Backend Project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run start

# build for production and launch server
$ npm run build

# this command will excute db-migrate,set ENV variable and migrate:reset to run testing on endpoints to check results
$ npm run test

# this command will run server with watching to changes
$ npm run watch

# this command will run migration to up
$ npm run migrate-up

# this command will run migration to reset all schema
$ npm run migrate:reset
```

## database connection

```
### just run DB server by pg admin or by CLI for DB credentials provided in ENV file

## test ENV

you need to switch defaultEnv to be test from database.json file and
you need also to start ( npm run test )  this command will run db-migrate up also to update DB schema and will update ENV variable to be test instead of dev and will run also migrate:reset

## dev ENV

you need to switch env to be dev from env file
you need to run this command to update DB schema >>>> npm run migrate-up

```

## API Endpoints

```user

 # signUp endpoint
method : post
url : http://localhost:3000/signUp
body :
{
      "userName": "abdo",
      "password": "123",
      "firstName": "abdelatif",
      "lastName": "arafa"
}
## this will generate token and you need it use it with some of remaining requests
#signIn endpoint
method : post
url : http://localhost:3000/signIn
body :
{
      "userName": "abdo",
      "password": "123",
}
## this will generate token and you need it use it with some of remaining requests

```

```products
## create product endpoint
headers : Authorization = bearer + {token}
method : post
url : http://localhost:3000/products
body :
{
       "name": "tea",
      "price": "10"
}

## show specific product by id endpoint
method : get
url :http://localhost:3000/products/:id

## show all products by endpoint
method : get
url :http://localhost:3000/products

```

```orders

## create order endpoint
method : post
headers : Authorization = bearer + {token}
url : http://localhost:3000/orders
body :
{
       "status": "Active",
        "userId": "1"
}

## show specific order by id endpoint
headers : Authorization = bearer + {token}
method : get
url :http://localhost:3000/orders/:id

## show all orders by endpoint
headers : Authorization = bearer + {token}
method : get
url :http://localhost:3000/orders



```
