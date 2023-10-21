<?php
class Usuarios extends Controller
{
    public function __construct()
    {
        parent::__construct();
        session_start();
    }
    public function index()
    {
        $data['title'] = 'Usuarios';
        $data['script'] = 'usuarios.js';
        $this->views->getView('usuarios', 'index', $data);
    }
    public function listar()
    {
        $data = $this->model->getUsuarios(1);
        for ($i = 0; $i < count($data); $i++) {

            if ($data[$i]['rol'] == 1) {
                $data[$i]['rol'] = '<span class="badge bg-success">ADMINISTRADOR</span>';
            } else {
                $data[$i]['rol'] = '<span class="badge bg-info">VENDEDOR</span>';
            }
            $data[$i]['acciones'] = '<div>
            <button class="btn btn-danger" type="button" onclick="eliminarUsuario('.$data[$i]['id'].')"> <i class="fas fa-times-circle"></i></button>
            </div>';
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }
    //metodo para registrar y moficicar usuarios
    public function registrar()
    {
        if (isset($_POST)) {
            if (empty($_POST['nombres'])) {
                $res = array('msg' => 'El nombre es requerido', 'type' => 'warning');
            } else if (empty($_POST['apellidos'])) {
                $res = array('msg' => 'El apellido es requerido', 'type' => 'warning');
            } else if (empty($_POST['correo'])) {
                $res = array('msg' => 'El correo es requerido', 'type' => 'warning');
            } else if (empty($_POST['telefono'])) {
                $res = array('msg' => 'El telefono es requerido', 'type' => 'warning');
            } else if (empty($_POST['direccion'])) {
                $res = array('msg' => 'La direccion es requerido', 'type' => 'warning');
            } else if (empty($_POST['clave'])) {
                $res = array('msg' => 'La contraseña es requerido', 'type' => 'warning');
            } else if (empty($_POST['rol'])) {
                $res = array('msg' => 'El rol es requerido', 'type' => 'warning');
            } else {
                $nombres = strClean($_POST['nombres']);
                $apellidos = strClean($_POST['apellidos']);
                $correo = strClean($_POST['correo']);
                $telefono = strClean($_POST['telefono']);
                $direccion = strClean($_POST['direccion']);
                $clave = strClean($_POST['clave']);
                $hash = password_hash($clave, PASSWORD_DEFAULT);
                $rol = strClean($_POST['rol']);

                //verificar si existe los datos
                $verificarCorreo = $this->model->getValidar('correo', $correo);
                if (empty($verificarCorreo)) {
                    $verificarTel = $this->model->getValidar('telefono', $telefono);
                    if (empty($verificarTel)) {
                        $data = $this->model->registrar($nombres, $apellidos, $correo, $telefono, $direccion, $hash, $rol);
                        if ($data > 0) {
                            $res = array('msg' => 'Usuario Registrado', 'type' => 'success');
                        } else {
                            $res = array('msg' => 'Error al registrar', 'type' => 'error');
                        }
                    } else {
                        $res = array('msg' => 'El telefono debe ser unico', 'type' => 'warning');
                    }
                } else {
                    $res = array('msg' => 'El correo debe ser unico', 'type' => 'warning');
                }
            }
        } else {
            $res = array('msg' => 'Error desconocido', 'type' => 'error');
        }
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
        die();
    }
    //metodo para eliminar registro
    public function eliminar($id)
    {
        if (isset($_GET)) {
            if (is_numeric($id)) {
                $data = $this->model->eliminar(0, $id);
                if ($data == 1) {
                    $res = array('msg' => 'Usuario dado de baja', 'type' => 'success');
                } else {
                    $res = array('msg' => 'Error al eliminar', 'type' => 'error');
                }    
            }else {
                $res = array('msg' => 'Error Desconocido', 'type' => 'error');
            }
        }else {
            $res = array('msg' => 'El nombre es requerido', 'type' => 'warning');
        }
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
        die();
    }
}
