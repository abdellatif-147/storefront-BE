# Storefront Backend Project

## Build Setup

```bash
# install dependencies
$ npm install

# server will run on url : localhost:3000
#  server port will be : 3000
$ npm run start

# build for production and launch server
$ npm run build

# it helps developers to find coding and formatting errors
$ npm run lint

# it will fix linting errors
$ npm run lint:fix

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
## first you need to create two databases one for dev and another for test

1- CREATE DATABASE storefront_dev
2- CREATE DATABASE storefront_test

## second you need to create tables schema by npm run migrate-up or npm run test or by CLI commands  :

1 - create user table :
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(64),
    lastName VARCHAR(64),
    username VARCHAR(100),
    password_digest VARCHAR
);
2- create product table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);
3- create order table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
4- create order_products table
CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

## third you need to connect to database
 you need to run database server by CLI or by pg admin and use these  credentials : 
user = postgres
password =@zozo@1
port = 5433
these provided in ENV file if you need check it as variables

### if you need to switch them through testing you can follow this :

## test ENV

you need to switch defaultEnv to be test from database.json file and
you need also to start ( npm run test )  this command will run db-migrate up also to update DB schema and will update ENV variable to be test instead of dev and will run also migrate:reset

## dev ENV

you need to switch env to be dev from env file
you need to run this command to update DB schema >>>> npm run migrate-up

```

## API Endpoints

```user
## this will generate token and you need it use it with some of remaining requests
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

## show all users by endpoint
headers : Authorization = bearer + {token}
method : get
url :http://localhost:3000/users


## show specific user by specific id
headers : Authorization = bearer + {token}
method : get
url :http://localhost:3000/user/:id

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
