# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

noted: set authorization on header
authorization = Bearer :token

#### Products

- Index (GET `/products` )
- Show (GET `/products/:id`)
- Create [token required] (POST `/products?name=&:price=&:quantity=`)
  ex: http://localhost:3000/products?name=nokia&price=22&quantity=12

#### Users

- Index [token required] (GET `/users`)
- Show [token required] (GET `/users/:id`)
- Create N[token required] (POST `/users`)

#### Orders

- Index [token required] (GET `/orders`)
- Show [token required] (GET `/orders/:id`)
- Create [token required] (POST `/orders?user_id=`)

## Data Shapes

#### Product

- id: number
- name: string
- price: number
- quantity: number

Sql scripts:
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
price integer NOT NULL,
quantity integer NOT NULL
);

#### User

- id: number
- email: string
- username: string
- password: string
- password_digest: string

Sql scripts:
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL,
password_digest VARCHAR NOT NULL
)

#### Orders

- id: number
- user_id: number
- total_price: number
- status: number

Sql scripts:
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id bigint REFERENCES users(id),
total_price integer NOT NULL,
status integer NOT NULL
);

#### Product_Orders

- id: number
- product_id: number
- quantity: number
- order_id: number

Sql scripts:
CREATE TABLE product_orders (
id SERIAL PRIMARY KEY,
quantity integer NOT NULL,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
);
