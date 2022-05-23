<?php 
require_once( __DIR__ . "\../models/ProductsModel.php");
//require( __DIR__ . "\../libs/Helper.php");
require( __DIR__ . "\../controllers/ApiController.php");
    /**
    @desc   Products controller 
     */class ProductsController extends ApiController {

        private $model;
        private $model_name;

        public function __construct()
        {
            preg_match("#(.+)/controllers$#", get_class($this), $match);
            $this->model_name = $match[0] . "Model";
            if (class_exists($this->model_name)) {
                $this->model = new $this->model_name();
            } else {
                throw new \Exception($this->model, 500);
            }
        }


        /**
        *        
        @uri    /products
        @verb   GET
        @desc   Get  all products

        @uri    /products/{sku}
        @verb   GET
        @desc   Get one Product
        */ public function getAction($request) {
            if (!empty($request->url_elements[3])) {
                throw new \Exception("Get by sku not yet implemented", 400);
            }
            return $this->model->getProducts();
        }

        /**
        @uri    /products
        @verb   POST
        @desc   Create one new product
         */public function putAction($request) {

            $this->model = Helper::cast($request->body->product, $this->model_name);

            if ($this->model->sku && $this->model->name && $this->model->price && $this->model->type && $this->model->properties){
                return $this->model->createProducts();
            }

            throw new \Exception("Request body does not contain all props of a product.", 400);
        }

        /**
        @uri    /products
        @verb   DELETE
        @desc   Delete one or multiple products
         */public function deleteAction($request){

            $this->model = Helper::cast($request->body->ids, $this->model_name);

            if ($this->model->ids){
                return $this->model->deleteProducts($this->model->ids);
                }

            throw new \Exception("Missing product SKUs.", 400);
        }
        
    }