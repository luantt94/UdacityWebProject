CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES users(id),
    total_price integer NOT NULL,
    status integer NOT NULL
);
