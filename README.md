# Pizza e-commerce cart BE application built with Node

Pizza delivery business.
Web application for ordering pizza for clients, which contains a shopping cart.

Clients should be able to order pizzas from the menu.

The menu contains at least 8 pizzas

The pizza order process covers ordering single or several pizzas with definition of the quantity and calculation of a total price in Euros and US$ also adding delivery costs to the bill.

## Demo
[Here](https://pizza-ecommerce.herokuapp.com/)

## Frontend Repository
[Here](https://github.com/florovarelaa/Pizza-Ecommerce-FE)

## Install

    npm install

## Run the app

    npm start

## Run the tests

    npm test
    
# Proyect Structure
    - Models
    - Controllers
    - Routes
    - db_config
    - tests

# API Endpoints

- **https://calm-eyrie-20363.herokuapp.com**

-To see all related endpoints check file 

- **Pizza-Ecommerce.postman_collection.json**


-Basic new cart order creation

- POST(/cartorder);
{
    "products": [
        {
            "id_order": 1,
            "id_product": 1,
            "price": 5,
            "quantity": 1
        },
        {
            "id_order": 1,
            "id_product": 2,
            "price": 6,
            "quantity": 2
        }
    ],
    "ship_address": "Address 123",
    "email": "example@example.com"
}

# DB Structure

-To see all related queries check file 

- **db_queries.sql**

* users
    - id_user
    - username
    - pass
    - firstname
    - lastname
    - email
* orders
    - id_order
    - id_user(fk)
    - order_date
    - ship_address
* products
    - id_product(fk)
    - product_name
    - unit_price
    - description
    - product_imgUrl
* order_detail
    - id_order_detail    
    - id_order(fk)
    - id_product(fk)
    - unit_price
    - quantity
