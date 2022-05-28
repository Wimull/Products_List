<?php 

namespace Api\Controllers;

use Api\Libs\Request;

interface ApiController
{
    public function getAction(Request $request);

    public function postAction(Request $request);

    public function deleteAction(Request $request);
    
}