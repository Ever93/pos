const formulario = document.querySelector('#formulario');
const correo = document.querySelector('#correo');
const clave = document.querySelector('#clave');

const errorCorreo = document.querySelector('#errorCorreo');
const errorClave = document.querySelector('#errorClave');

document.addEventListener('DOMContentLoaded', function() {
    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        errorCorreo.textContent = '';
        errorClave.textContent = '';
        if (correo.value == '') {
            errorCorreo.textContent = 'El correo es necesario';
        } else if(clave.value == ''){
            errorClave.textContent = 'La Contraseña es necesaria';
        }else{
            const url = base_url + 'home/validar';
            //Crear formData
            const data = new FormData(this);
            //Hacer una instancia del objeto XMLHttpRequest
            const http = new XMLHttpRequest();
            //Abrir una conexion POST - GET
            http.open('POST', url, true);
            //Enviar datos
            http.send(data);
            //Verificar estados
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                }
            }
        }
    });
});