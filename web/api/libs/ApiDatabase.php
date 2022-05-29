<?php

namespace Api\Libs;

interface ApiDatabase
{

    public static function getEntries(String $table, String $class); 

    public static function setEntry(String $table, Object $request);
}