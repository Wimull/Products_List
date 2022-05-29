# Products_List

## Description

Simple web application experimenting with PHP, displays a list of products that
the user can interact with by deleting them or adding a new product. <br> The
SKU of each product (the primary key in the db) is automatically generated and
the user cannot change it directly, only by modifying its dependencies that is,
"name", "price", and "type" of your product.

You can go to https://products-list-wine.vercel.app/ to see a deployed version of the app.

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

For the app to be run you will need to have running in your machine a MySQL server
with a database named `api_products` on `localhost` with the user and password both
named `admin`, or any other database. Create a `.env` file to the
`web` directory with there properties: `DB_URI=mysql:host=<hostname>;dbname=<db_name>;port:<port>`, where `hostname`, `db_name` and `port` are the respective properties of your mysql connection; a `DB_ADMIN=<admin>` with login name for your connection; and a `DB_PASSWORD` with the password for your connection.  <br> <br> Then, to start the server, go to `web\php` and run
`php -S localhost:<port>` on the terminal, where `port` is your port of choice
for the server to be run at. <br> <br> Then, add a `.env.local` file, also to the
`web` directory, with a `VITE_API_URL` variable with the value
`http://localhost:<port>/api` where `port` is the port where the server is being
run. Then run in the terminal `npm run build` followed by `npm run start` to run
the production build, or `npm run dev` to run the developer build. Finally, go
to `http://localhost:3000` to see the application.
