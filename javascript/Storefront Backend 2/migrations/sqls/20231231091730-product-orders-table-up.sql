CREATE TABLE product_orders (
    id SERIAL PRIMARY  KEY,
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
