#Products_List

## Description

Simple web application experimenting with PHP, displays a list of products that
the user can interact with by deleting them or adding a new product. <br> The
SKU of each product (the primary key in the db) is automatically generated and
the user cannot change it directly, only by modifying its dependencies that is,
"name", "price", and "type" of your product.

## Technologies used

-   [ ] **Front end**
    -   [ ] **React**
    -   [ ] **Typescript**
    -   [ ] **Bootstrap 5**
-   [ ] **Back-End**
    -   [ ] **Plain PHP**
    -   [ ] **MySQL**
    -   [ ] **REST Api**

## Running the app

For the app to be run you will need to have running in your machine a MySQL
database named `api_products` on `localhost` with the user and password both
named `admin`. <br> <br> Then, to start the server, go to `web\php` and run
`php -S localhost:<port>` on the terminal, where `port` is your port of choice
for the server to be run at. <br> <br> Then, add a `.env.local` file to the
`web` directory with a `VITE_API_URL` variable with the value
`http://localhost:<port>/api` where `port` is the port where the server is being
run. Then run in the terminal `npm run start` to run the production build, or
`npm run dev` to run the developer build. Finally, go to `http://localhost:3000`
to see the application.
