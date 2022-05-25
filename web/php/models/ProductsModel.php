<?php  

//require( __DIR__ . "\../libs/Helper.php");
require_once( __DIR__ . "\../models/ApiModel.php");

    class ProductsModel extends ApiModel {

        public $sku;
        public $name;
        public $price;
        public $type;
        public $properties;

        public function getProducts(){

            $pdo = DB::get()->prepare("SELECT * FROM products");
            $pdo->execute();
            $result = $pdo->fetchAll(\PDO::FETCH_CLASS, "ProductsModel");

            $products = array();
            if(count($result)) {
                foreach ($result as $row) array_push($products, $row);
                return $products;
            }
            return $products;
        }
        public function createProducts(){
            try{

                $pdo = DB::get()->prepare("INSERT INTO products (sku, name, price, type, properties) VALUES (:sku, :name, :price, :type, :properties)");
                $pdo->execute(array("sku" => $this->sku, "name" => $this->name, "price" => $this->price, "type" => $this->type, "properties" => $this->properties));
                if ($pdo -> rowCount() > 0){
                    $this->sku = DB::lastInsertID("sku");
                    return $this;
                }
                throw new \Exception("No product was created", 500);
            } catch (Exception $e){
                throw new \Exception("No product was created", 406);

            }
        }

        public function deleteProducts($products_sku){
            $this->sku = $products_sku;
            $query = "DELETE FROM products WHERE sku IN ('" . implode("', '", $products_sku) . "')";
            $pdo = DB::get()->query($query);
            if ($pdo->rowCount() > 0){
                return $this;
            } throw new \Exception("No product was deleted", 500);
        }
        public function optionsProducts($request){
            return $this;
        }
    }