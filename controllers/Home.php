<?php
class Home extends Controller{
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $data['title'] = 'Iniciar Sesion';
        $this->views->View('principal', 'login', $data);
    }
    //Validar Formulario de login
    public function validar()
    {
        if (isset($_POST['correo']) && isset($_POST['clave'])) {
            echo 'Si existe';
        }else{
            echo 'No existe';
        }
    }
}

?>