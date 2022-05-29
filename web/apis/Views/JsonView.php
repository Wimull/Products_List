<?php 
namespace Api\Views;

use Api\Views\ApiView;

    class JsonView implements ApiView
    {
        public function render($content){
            header('Content-Type: application/json; charset=utf8');
            header('Access-Control-Allow-Methods: *');
            header('Access-Control-Allow-Headers: *');
            header('Access-Control-Allow-Origin: *');
            return json_encode($content);
        }
    }