<?php 


class Request{
    public $url_elements;	// URL elements in array delimited by '/' excluding parameters
    public $verb;			
    public $parameters;		// URL parameters. reserved variables = format
	public $body;			
	public $request_format; 
	public $output_format;	


    public function __construct() {
        echo "hi";
        $this->verb = $_SERVER['REQUEST_METHOD'];
        $this->url_elements = explode('/', explode('?', $_SERVER['REQUEST_URI'])[0]);
		$this->output_format = 'json';
		$this->parseURLParams();
        $this->parseBody();
        if(!empty($this->parameters['format'])) {
            $this->output_format = $this->parameters['format'];
        }
        return true;
    }

    private function parseURLParams() {
        if (!empty($_SERVER['QUERY_STRING'])) {
            parse_str( $_SERVER['QUERY_STRING'], $this->parameters);
        }
	}
	
	private function parseBody() {
        $body = file_get_contents("php://input");
        $this->request_format = false;
        if(!empty($_SERVER['CONTENT_TYPE']) && strlen($body) > 0) {
            $this->request_format = $_SERVER['CONTENT_TYPE'];
			if($this->request_format == "application/json") {
                $body = json_decode($body);

                if($body) $this->body = $body;
                else throw new \Exception("The request content was invalid and could not be parsed successfully as JSON.", 400);

                $this->output_format = "json";

            } else throw new \Exception("Unsupported request body Content-Type of '".$_SERVER['CONTENT_TYPE']."'.", 400);

		} elseif (strlen($body) > 0) {
			throw new \Exception("There was no Content-Type set in the request.", 400);
		}
    }
}