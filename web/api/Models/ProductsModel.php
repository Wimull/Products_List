<?php  

namespace api\Models;

use Api\Models\ApiModel;
use api\Libs\DB;



    class ProductsModel implements ApiModel {

        private $dbRequest;

        public function getProducts()
        {
            $products = DB::getEntries("products", "Api\Models\ProductsModel");
            return $products;
        }
        public function createProducts($body)
        {
            $this->dbRequest = new class{};
            $this->dbRequest->action = "create";
            $this->dbRequest->body = $body;
            $result = DB::setEntry("products", $this->dbRequest);
            return $result;
            
        }
        
        public function deleteProducts($products_sku)
        {
            $this->dbRequest = new class{};
            $this->dbRequest->action = "delete";
            $this->dbRequest->body = new class{};
            $this->dbRequest->body->idColumn = "sku";
            $this->dbRequest->body->ids = $products_sku;
            $result = DB::setEntry("products", $this->dbRequest);
            return $result;
        }
        public function optionsProducts($request)
        {
            return $this;
        }
    }