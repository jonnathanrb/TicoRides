const welcome_message = document.getElementById("welcomeMessage");

if (welcome_message){
    console.log("encontro message")
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    // Obtener el valor del parámetro "username"
    const username = params.get("username");
    welcome_message.textContent = "Welcome " + username;

    console.log("Todo hecho")
}