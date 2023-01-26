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
            if (empty($_POST['correo'])) {
                $res = array('msg' => 'El correo es necesario');
            }else if(empty($_POST['clave'])) {
                $res = array('msg' => 'La contraseña es necesario');
            }else{

            }
            echo json_encode($res, JSON_UNESCAPED_UNICODE);
        }
        die();
    }
}

?>