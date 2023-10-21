let tblUsuarios;
const formulario = document.querySelector('#formulario');
const nombres = document.querySelector('#nombres');
const apellidos = document.querySelector('#apellidos');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const direccion = document.querySelector('#direccion');
const clave = document.querySelector('#clave');
const rol = document.querySelector('#rol');
const id = document.querySelector('#id');

//elementos para mostrar errores
const errorNombre = document.querySelector('#errorNombre');
const errorApellido = document.querySelector('#errorApellido');
const errorCorreo = document.querySelector('#errorCorreo');
const errorTelefono = document.querySelector('#errorTelefono');
const errorDireccion = document.querySelector('#errorDireccion');
const errorClave = document.querySelector('#errorClave');
const errorRol = document.querySelector('#errorRol');

const btnAccion = document.querySelector('#btnAccion');

document.addEventListener('DOMContentLoaded', function () {
    //cargar datos con plugin datatable
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + 'usuarios/listar',
            dataSrc: ''
        },
        columns: [
            { data: 'nombres' },
            { data: 'correo' },
            { data: 'telefono' },
            { data: 'direccion' },
            { data: 'rol' },
            { data: 'acciones' }
        ],
        language: {
            url: base_url + 'assets/js/espanol.json'
        },
        dom,
        buttons,
        responsive: true,
        order: [[0, 'asc']],
    });
    //registrar usuarios
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        errorNombre.textContent = '';
        errorApellido.textContent = '';
        errorCorreo.textContent = '';
        errorTelefono.textContent = '';
        errorDireccion.textContent = '';
        errorClave.textContent = '';
        errorRol.textContent = '';
        if (nombres.value == '') {
            errorNombre.textContent = 'El nombre es requerido';
        } else if (apellidos.value == '') {
            errorApellido.textContent = 'El apellido es requerido';
        } else if (correo.value == '') {
            errorCorreo.textContent = 'El correo es requerido';
        } else if (telefono.value == '') {
            errorTelefono.textContent = 'El telefono es requerido';
        } else if (direccion.value == '') {
            errorDireccion.textContent = 'La dirección es requerida';
        } else if (clave.value == '') {
            errorClave.textContent = 'La clave es requerida';
        } else if (rol.value == '') {
            errorRol.textContent = 'El rol es requerido';
        } else {
            const url = base_url + 'usuarios/registrar';
            //crear formData
            const data = new FormData(this);
            //hacer una instancia del objeto XMLHttpRequest 
            const http = new XMLHttpRequest();
            //Abrir una Conexion - POST - GET
            http.open('POST', url, true);
            //Enviar Datos
            http.send(data);
            //verificar estados
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    Swal.fire({
                        toast: true,
                        position: 'top-right',
                        icon: res.type,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    if (res.type == 'success') {
                        formulario.reset();
                        tblUsuarios.ajax.reload();
                    }
                }
            }
        }
    })

})
//funcion para eliminar usuarios
function eliminarUsuario(idUsuario) {
    Swal.fire({
        title: 'Estas seguro de eliminar?',
        text: "El registro no se eliminara de forma permanente, solo cambiara el estado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + 'usuarios/eliminar/' + idUsuario;
            //hacer una instancia del objeto XMLHttpRequest 
            const http = new XMLHttpRequest();
            //Abrir una Conexion - POST - GET
            http.open('GET', url, true);
            //Enviar Datos
            http.send();
            //verificar estados
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    Swal.fire({
                        toast: true,
                        position: 'top-right',
                        icon: res.type,
                        title: res.msg,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    if (res.type == 'success') {
                        tblUsuarios.ajax.reload();
                    }
                }
            }
        }
    })
}
//funcion para recuperar los datos
function editarUsuario(idUsuario) {
    const url = base_url + 'usuarios/editar/' + idUsuario;
    //hacer una instancia del objeto XMLHttpRequest 
    const http = new XMLHttpRequest();
    //Abrir una Conexion - POST - GET
    http.open('GET', url, true);
    //Enviar Datos
    http.send();
    //verificar estados
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            id.value = res.id;
            nombres.value = res.nombre;
            apellidos.value = res.apellido;
            correo.value = res.correo;
            telefono.value = res.telefono;
            direccion.value = res.direccion;
            rol.value = res.rol;
            clave.value = '0000000';
            clave.setAttribute('readonly', 'readonly');
            btnAccion.textContent = 'Actualizar';
            const firstTabEl = document.querySelector('#nav-tab button:last-child')
            const firstTab = new bootstrap.Tab(firstTabEl)
            firstTab.show()
        }
    }
}