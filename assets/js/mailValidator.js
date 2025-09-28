document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío inmediato del formulario

    // Obtén los valores de los campos
    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var subject = document.querySelector('input[name="subject"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    // Verifica si los campos están vacíos
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    // Verifica si el correo electrónico es válido
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingresa una dirección de correo electrónico válida.');
        return;
    }

    // Muestra una alerta de confirmación
    if (confirm('¿Estás seguro de que quieres enviar este mensaje? Nuestro equipo se pondrá en contacto con usted lo antes posible. Recuerde no dejar campos vacíos o incorrectos.')) {
        // Crea un objeto FormData para enviar los datos del formulario
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        // Realiza la solicitud AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'assets/php/contact.php', true); // Define la ruta correcta al script PHP
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Muestra el mensaje de éxito y limpia el formulario
                alert('Mensaje enviado correctamente.');
                document.getElementById('contact-form').reset(); // Limpia todos los campos del formulario
            } else {
                // Muestra el mensaje de error
                alert('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
            }
        };
        xhr.onerror = function() {
            // Muestra el mensaje de error en caso de fallo de la solicitud
            alert('No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.');
        };
        xhr.send(formData); // Envía los datos del formulario al servidor PHP
    } else {
        // Si el usuario cancela, muestra un mensaje de cancelación
        alert('El envío del mensaje ha sido cancelado.');
    }
});
