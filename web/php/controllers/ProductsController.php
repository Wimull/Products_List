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
            preg_match("#(.+)Controller$#", get_class($this), $match);
            $this->model_name = $match[1] . "Model";
            if (class_exists($this->model_name)) {
                $this->model = new $this->model_name();
            } else {
                throw new \Exception("Model was not created.", 500);
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
         */public function postAction($request) {

            $this->model->sku = $request->body->sku;
            $this->model->name = $request->body->name;
            $this->model->price = $request->body->price;
            $this->model->type = $request->body->type;
            $this->model->properties = $request->body->properties;
            
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

            $ids = $request->body->ids;

            if (count($ids)){
                return $this->model->deleteProducts($ids);
                }

            throw new \Exception("Missing product SKUs.", 400);
        }
        public function optionsAction($request){
            return $this->model->optionsProducts($request);
        }
        
    }