<?php  
namespace api;

use api\Libs\Request;
use api\Views\JsonView;

// TODO - Deploy a MySQL Database, probably to AWS somehow...

require_once __DIR__ . "/Controllers/ApiController.php";
require_once __DIR__ . "/Controllers/ProductsController.php";
require_once __DIR__ . "/Models/ApiModel.php";
require_once __DIR__ . "/Models/ProductsModel.php";
require_once __DIR__ . "/Views/ApiView.php";
require_once __DIR__ . "/Views/JsonView.php";
require_once __DIR__ . "/libs/ApiDatabase.php";
require_once __DIR__ . "/libs/DB.php";
require_once __DIR__ . "/libs/Request.php";
require_once __DIR__ . "/libs/Helper.php";
require_once __DIR__ . "/vendor/autoload.php";





try{

        
    $debug = 0;
    $request = new Request();
        
    if ($request->url_elements[2] && !strpos($request->url_elements[2],".")) {
        $controller_name = "Api\\Controllers\\" . ucfirst($request->url_elements[2]) . "Controller";
        if(class_exists($controller_name)){
            $controller = new $controller_name();
            $action_name = strtolower($request->verb) . "Action";
            $result = $controller->$action_name($request);

            if (!$debug) {
                $view_name = "Api\\Views\\" . ucfirst($request->output_format) . 'View';

                if(class_exists($view_name)) {
                    $view = new $view_name();
                    echo $view->render($result);
                } else {
                    throw new \Exception("The requested format '$request->output_format' is not supported.", 400);
                }

            } else { // if debugging is enabled, output the request and response as HTML
            
                header('Content-Type: text/html; charset=utf8');
                echo "<h1>DEBUGGING</h1><br/>";
                echo "<h3>REQUEST</h3>";
                echo "<b>Request URI: </b>" . $_SERVER['REQUEST_URI'] . "<br/><br/>";
                echo "<b>Verb: </b>" . $request->verb . "<br/><br/>";
                echo "<b>Request Body (parsed): </b><br/>";
                echo var_dump($request->body);
                echo "<b>Request (parsed): </b><br/>";
                echo var_dump($request) . "<br/><br/>";
                echo "<h3>RESPONSE</h3>";
                echo "<b>Result (parsed): </b><br/>";
                echo var_dump($result);
                echo "<b>JSON Result: </b>" . json_encode($result);
            }
        } else throw new \Exception("The requested object '$controller_name' is not supported.", 400);
    } else {
        if (ucwords($request->verb) == "GET" && !$request->url_elements[2]) {
			throw new \Exception("The 'controller' URL parameter is missing.", 400);
		}
    }
} catch (\Exception $e) {
	http_response_code($e->getCode());
    $view = new JsonView();
    echo $view->render($e);
	echo "<h1>" . $e->getCode() . " - " . $e->getMessage() . "</h1><br/><br/>";
	echo "Stack Trace: " . $e->getTraceAsString();
	error_log(date('Y-m-d h:i:s a', time()) . " - " . $e->getCode() . " - " . $e->getMessage() . PHP_EOL . "Stack Trace: " . $e->getTraceAsString() . PHP_EOL.PHP_EOL, 3, "log.txt");

}

