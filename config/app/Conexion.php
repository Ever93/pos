<?php
class Conexion{
    private $conect;
    public function __construct() {
        $pdo = "mysql:host=" . HOST . ";dbname=" . DBNAME . ";".CHARSET;
        try {
            $this->conect = new PDO($pdo, USER, PASS);
            $this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo 'conectado';
        } catch (PDOException $e) {
            echo 'Error en la conexion: ' . $e->getMessage();
        }
    }
    public function conectar(Type $var = null)
    {
        return $this->conect;
    }
}
?>