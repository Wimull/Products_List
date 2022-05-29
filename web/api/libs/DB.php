<?php
namespace api\Libs;

use api\Libs\ApiDatabase;

use PDOException;

require_once __DIR__ . "/../vendor/autoload.php";



$dotenv = \Dotenv\Dotenv::createImmutable(dirname(__FILE__, 3));

$dotenv->safeLoad();
echo $_SERVER["DB_URI"];


    class DB implements ApiDatabase
    {
        private static $instance = null;



        private static function connect()
{
            if (self::$instance == null){
                try{
                    self::$instance = new \PDO($_SERVER["DB_URI"], $_SERVER["DB_LOGIN"], $_SERVER["DB_PASSWORD"]);
                    self::$instance->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                }

                catch(\PDOException $e) {
                    throw new \Exception("Unable to connect to the database - " . $e->getMessage(), 500);
                }
            }
        }

        public static function getEntries($table, $class)
        {
            if (self::$instance == null) self::connect();
            $query = 'SELECT * FROM ' . $table;

            $pdo = self::$instance->query($query);
            $result = $pdo->fetchAll(\PDO::FETCH_CLASS, $class);
            $entries = array();
            if (count($result)){
                foreach ($result as $row) array_push($entries, $row);
                return $entries;
            }
            return $entries;

            //return $this->instance;
        }

        public static function setEntry($table, $request)
        {
            if (self::$instance == null) self::connect();
            switch ($request->action){
                case "create":
                    return self::create($table, $request->body);
                case "delete":
                    return self::delete($table, $request->body->idColumn, $request->body->ids);
                default:
                throw new \Exception("Database could not perform requested method: does not exists.", 400);
            }
        }



        private static function create($table, $request)
        {
            //throw new \Error(json_encode($request), 400);
            $requestProperties = get_object_vars($request);
            $keys = array_keys($requestProperties);
            $values = array_values($requestProperties);

            try {
                $query = "INSERT INTO " . $table . "(" . implode(", ", $keys) . ") VALUES ('" . implode("', '", $values) . "')";
                $pdo = self::$instance->query($query);
                if ($pdo->rowCount() > 0){
                    return $request;
                } else {
                    throw new \Exception("No entry was created", 400);
                }

            } catch(PDOException $e){
                throw new \Exception("Database could not create entry:", 406);
            }
        }

        private static function delete($table, $idColumn, $ids)
        {
            $query = "DELETE FROM " . $table . " WHERE " . $idColumn . " IN ('" . implode("', '", $ids) . "')";
            $pdo = self::$instance->query($query);
            if ($pdo->rowCount() > 0){
                return "Entries: " . implode(", ", $ids) . " in " . $table . " were deleted successfully.";
            } else {
                throw new \Exception("No entry was deleted", 500);
            }
        }
    }