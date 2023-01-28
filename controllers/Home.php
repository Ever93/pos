<?php
class Home extends Controller{
    public function __construct(){
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = 'Iniciar Sesion';
        $this->views->getView('principal', 'login', $data);
    }
    //Validar Formulario de login
    public function validar()
    {
        if (isset($_POST['correo']) && isset($_POST['clave'])) {
            if (empty($_POST['correo'])) {
                $res = array('msg' => 'El correo es necesario', 'type' => 'warning');
            }else if(empty($_POST['clave'])) {
                $res = array('msg' => 'La contraseña es necesario', 'type' => 'warning');
            }else{
                $correo = strClean($_POST['correo']);
                $clave = strClean($_POST['clave']);
                $data = $this->model->getDatos($correo);
                if (empty($data)) {
                    $res = array('msg' => 'El correo no existe', 'type' => 'warning');
                }else {
                    if (password_verify($clave, $data['clave'])) {
                        $_SESSION['nombre_usuario'] = $data['nombre'];
                        $_SESSION['correo_usuario'] = $data['correo'];
                        $res = array('msg' => 'Datos Correctos', 'type' => 'success');
                    }else{
                        $res = array('msg' => 'Contraseña Incorrecta', 'type' => 'warning');
                    }
                }
            }
        }else {
            $res = array('msg' => 'Error desconocido', 'type' => 'error');
        }
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
        die();
    }
}

?>