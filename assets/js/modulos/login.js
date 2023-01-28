const formulario = document.querySelector('#formulario');
const correo = document.querySelector('#correo');
const clave = document.querySelector('#clave');

const errorCorreo = document.querySelector('#errorCorreo');
const errorClave = document.querySelector('#errorClave');

document.addEventListener('DOMContentLoaded', function () {
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        errorCorreo.textContent = '';
        errorClave.textContent = '';
        if (correo.value == '') {
            errorCorreo.textContent = 'El correo es necesario';
        } else if (clave.value == '') {
            errorClave.textContent = 'La Contraseña es necesaria';
        } else {
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
            http.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);  
                    Swal.fire(
                        'Mensaje?',
                        res.msg,
                        res.type
                    )
                    if (res.type == 'success') {
                        setTimeout(() => {
                            let timerInterval
                            Swal.fire({
                                title: res.msg,
                                html: 'Sera redireccionado en <b></b> milisegundos.',
                                timer: 2000,
                                timerProgressBar: true,
                                didOpen: () => {
                                    Swal.showLoading()
                                    const b = Swal.getHtmlContainer().querySelector('b')
                                    timerInterval = setInterval(() => {
                                        b.textContent = Swal.getTimerLeft()
                                    }, 100)
                                },
                                willClose: () => {
                                    clearInterval(timerInterval)
                                }
                            }).then((result) => {
                                /* Read more about handling dismissals below */
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    window.location = base_url + 'admin';
                                }
                            })  
                        }, 2000);
                    }
                }
            }
        }
    });
});