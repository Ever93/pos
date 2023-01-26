<?php
class HomeModel extends Query{
    public function __construct() {
        parent::__construct();
    }
    public function getDatos($correo)
    {
        $sql = "SELECT nombre, correo, clave FROM usuarios WHERE correo = '$correo'";
        return $this->select($sql);
    }
}
?>