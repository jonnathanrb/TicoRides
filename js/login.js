const formulario = document.getElementById("formRegistro");
const formularioLogin = document.getElementById("formLogin");
const btnRegister = document.getElementById("botonRegister");
const inputFirstName = document.getElementById("FirstName");
const inputLastName = document.getElementById("LastName");
const inputPhone = document.getElementById("Phone");
const inputUsername = document.getElementById("Username");
const inputPassword = document.getElementById("Password");
const inputRepeatPassword = document.getElementById("RepeatPassword");

if (formulario){
    formulario.addEventListener("submit", (evento) => {
        // Evitar que el formulario intente enviar datos al servidor
        evento.preventDefault();
    
        // Crear el objeto Usuario con los datos del formulario
        const usuario = {
            FirstName: inputFirstName.value,
            LastName: inputLastName.value,
            Phone: inputPhone.value,
            Username: inputUsername.value,
            Password: inputPassword.value
        };
    
        // Validar datos
        if (!usuario.FirstName || !usuario.LastName || !usuario.Phone || !usuario.Username || !usuario.Password) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }
    
        if (inputPassword.value != inputRepeatPassword.value) {
            alert("Las contraseñas no coinciden");
            return;
        }
    
        // Guardar el objeto en Local Storage
        if (localStorage.getItem(usuario.Username) === null) {
            // La clave no existe, guardar el valor
            console.log("Guardando");
            localStorage.setItem(usuario.Username, JSON.stringify(usuario));
            console.log("Guardado");
            alert(`Usuario registrado: ${usuario.Username}`);

            localStorage.setItem("logueado", usuario.Username);
            
            // Redirigir a index.html después del registro
            window.location.href = `index.html?username=${encodeURIComponent(usuario.Username)}`;
        } else {
            // La clave ya existe
            alert(`El usuario "${usuario.Username}" ya existe, por favor elija uno diferente`);
            console.log("No se guardó");
        }
    });
}

if (formularioLogin){
    formularioLogin.addEventListener("submit", (evento) => {
        // Evitar que el formulario intente enviar datos al servidor
        console.log("holaaaaaaaaa")
        evento.preventDefault();
    
        const username = inputUsername.value;
        const password = inputPassword.value;
    
        console.log("Obtuvo username y password")
    
        // Validar datos
        if (!username || !password) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }
    
        // Verificar si el usuario existe en Local Storage
        const usuarioGuardado = localStorage.getItem(username);
        console.log("Obtuvo usuario")
    
        if (!usuarioGuardado) {
            // Usuario no encontrado
            alert("Usuario no existe")
            return;
        }
    
        // Parsear el objeto del usuario
        const usuario = JSON.parse(usuarioGuardado);
        console.log("Parseo usuario")
    
        // Validar contraseña
        if (usuario.Password !== password) {
            alert("Contraseña incorrecta. Inténtalo de nuevo.")
            return;
        }
    
        console.log("Exito")
        // Login exitoso: redirigir a otra página
        alert(`Bienvenido, ${usuario.FirstName}!`);
        localStorage.setItem("logueado", username);
        window.location.href = `index.html?username=${encodeURIComponent(username)}`;
    });
}




