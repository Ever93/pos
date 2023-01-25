<?php
class Home extends Controller{
    public function __construct()
    {
        parent::__construct();
    }
    public function index($parametro)
    {
        $data = $this->model->getDatos($parametro);
        $this->views->View('principal', 'login', $data);
    }
}

?>