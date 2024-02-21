# Storefront Backend Project

## Set up

Create database name: store_front
Run below commands:
npm install
db-migrate up

## Environmental Variables

Create .env file then fill below information:
POSTGRES_HOST=localhost
POSTGRES_DB=store_front
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=user
POSTGRES_PASSWORD=password
ENV=dev
BCRYPT_PASSWORD=qwertyuiopasdffffgghjjjjkl
SALT_ROUNDS=10
TOKEN_SECRET=gogogiodfigodi

## Ports

The application runs on port "3000" and database runs on port 5432.
Database for dev: store_front
Database for test: store_front_test

## Dev Mode

run: npm start

## Test Mode

run: npm run test
