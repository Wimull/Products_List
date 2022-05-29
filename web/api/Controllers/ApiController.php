<?php 

namespace api\Controllers;

use api\Libs\Request;

interface ApiController
{
    public function getAction(Request $request);

    public function postAction(Request $request);

    public function deleteAction(Request $request);
    
}