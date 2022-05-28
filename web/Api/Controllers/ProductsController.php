<?php

namespace Api\Controllers;

use Api\Models\ProductsModel;
use Api\Controllers\ApiController;



    /**
    @desc   Products controller 
     */class ProductsController implements ApiController
    {

        private $model;
        private $model_name;


        public function __construct()
        {
            $this->model_name = "Api\\Models\\ProductsModel";
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
        */ public function getAction($request)
        {
            if (!empty($request->url_elements[3])) {
                throw new \Exception("Get by sku not yet implemented", 400);
            }
            return $this->model->getProducts();
        }

        /**
        @uri    /products
        @verb   POST
        @desc   Create one new product
         */public function postAction($request)
        {
            $body = new class{}; 
            $body->sku = $request->body->sku;
            $body->name = $request->body->name;
            $body->price = $request->body->price;
            $body->type = $request->body->type;
            $body->properties = $request->body->properties;
            
            if ($body->sku && $body->name && $body->price && $body->type && $body->properties){
                return $this->model->createProducts($body);
            }

            throw new \Exception("Request body does not contain all props of a product.", 400);
        }

        /**
        @uri    /products
        @verb   DELETE
        @desc   Delete one or multiple products
         */public function deleteAction($request)
         {

            $ids = $request->body->ids;

            if (count($ids)){
                return $this->model->deleteProducts($ids);
                }

            throw new \Exception("Missing product SKUs.", 400);
        }
        public function optionsAction($request)
        {
            return $this->model->optionsProducts($request);
        }
        
    }