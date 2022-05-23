<?php 
require_once (__DIR__  . "/ApiView.php");
    class JsonView extends ApiView{
        public function render($content){
            header('Content-Type: application/json; charset=utf8');
            header('Access-Control-Allow-Origin: *');
            echo json_encode($content);
            return true;
        }
    }