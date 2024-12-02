const welcome_message = document.getElementById("welcomeMessage");
const botonSave = document.getElementById("boton-save");

console.log(botonSave)

if (welcome_message){
    console.log("encontro message")
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    // Obtener el valor del parámetro "username"
    const username = params.get("username");

    const usuarioLogueado = localStorage.getItem("logueado");
    welcome_message.textContent = "Welcome " + usuarioLogueado;

    console.log("Todo hecho")
}

if (botonSave && !document.getElementById("form-edit-ride")){
    console.log("botonSaveee")
    botonSave.addEventListener("click", (evento) => {
        evento.preventDefault()
        createRide();
    })
}

function createRide() {
    const rideName = document.getElementById("fullname");
    const startFrom = document.getElementById("startFrom");
    const end = document.getElementById("end");
    const aboutMe = document.getElementById("AboutMe");
    const departure = document.getElementById("Departure");
    const estimatedArrival = document.getElementById("Arrival");

    // Seleccionar todos los checkboxes con el atributo name="day"
    const checkboxes = document.querySelectorAll('input[name="day"]:checked');

    // Crear una lista con los valores seleccionados
    const selectedDays = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Mostrar en consola (o usar en tu lógica)
    console.log(selectedDays);

    if (!rideName.value || !departure.value || !startFrom.value || !end.value || !aboutMe.value || !estimatedArrival.value || selectedDays.length == 0){
        alert("Debes llenar todos los espacios!")
        return;
    }

    const ride = {
        Username: localStorage.getItem("logueado"),
        RideName: rideName.value,
        StartFrom: startFrom.value,
        End: end.value,
        AboutMe: aboutMe.value,
        Departure: departure.value,
        EstimatedArrival: estimatedArrival.value,
        SelectedDays: selectedDays
    };

    // Obtener la lista de rides
    let rides = JSON.parse(localStorage.getItem("rides")) || [];

    // Agregar el nuevo ride a la lista
    rides.push(ride);

    // Guardar la lista actualizada en Local Storage
    localStorage.setItem("rides", JSON.stringify(rides));

    alert("Ride guardado exitosamente.");
}

if (document.querySelector("#table-rides tbody")){
    console.log("Dom loadeeeed")
    document.addEventListener("DOMContentLoaded", () => {
        MostrarRides();
    })
}

function MostrarRides() {
    const rides = JSON.parse(localStorage.getItem("rides")) || [];
    const tableBody = document.querySelector("#table-rides tbody");
    tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    // Recorrer cada ride y agregar una fila a la tabla
    rides.forEach((ride, index) => {
        if (ride.Username == localStorage.getItem("logueado")){
            const row = document.createElement("tr"); // Crear una nueva fila
        row.classList.add("fondo-2"); // Agregar la clase 'fondo-2'

        // Crear las celdas (td) y agregar los valores de cada ride
        const rideNameCell = document.createElement("td");
        rideNameCell.textContent = ride.RideName;
        row.appendChild(rideNameCell);

        const startFromCell = document.createElement("td");
        startFromCell.textContent = ride.StartFrom;
        row.appendChild(startFromCell);

        const endCell = document.createElement("td");
        endCell.textContent = ride.End;
        row.appendChild(endCell);

        // Crear la celda para los botones
        const actionsCell = document.createElement("td");

        // Crear el botón "Edit"
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => {
            window.location.href = `EditRide.html?rideIndex=${index}`;
        };
        actionsCell.appendChild(editButton);

        // Crear el botón "Delete"
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            // Aquí agregas la lógica para eliminar el ride
            deleteRide(index);
        };
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell); // Agregar la celda con los botones a la fila

        // Agregar la fila a la tabla
        tableBody.appendChild(row);
        }
        
    });
}

// Función para eliminar un ride
function deleteRide(index) {
    // Mostrar una alerta de confirmación
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este ride?");
    
    if (confirmDelete) {
        const rides = JSON.parse(localStorage.getItem("rides")) || [];
        rides.splice(index, 1); // Eliminar el ride en el índice especificado
        localStorage.setItem("rides", JSON.stringify(rides)); // Guardar los cambios en Local Storage
        MostrarRides(); // Recargar los rides después de eliminar uno
        alert("El ride ha sido eliminado.");
    } else {
        // Si el usuario cancela, no se hace nada
        alert("El ride no fue eliminado.");
    }
}

if (document.getElementById("form-edit-ride")){
    console.log("En editar")
    document.addEventListener("DOMContentLoaded", (evento) => {
        console.log("Editando")
        CargarDatosEditar();
    })
}


function CargarDatosEditar (){
    // Obtener elementos del formulario
    const fullnameInput = document.getElementById("fullname");
    const startFrom = document.getElementById("startFrom");
    const end = document.getElementById("end");
    const aboutMeTextarea = document.getElementById("AboutMe");
    const selectedDaysCheckboxes = document.querySelectorAll("input[name='day']");
    const departureInput = document.querySelector("input[name='departure']");
    const arrivalInput = document.querySelector("input[name='arrival']");

    // Obtener el índice del ride desde la URL
    const params = new URLSearchParams(window.location.search);
    const rideIndex = params.get("rideIndex");

    // Cargar el ride desde Local Storage
    const rides = JSON.parse(localStorage.getItem("rides")) || [];
    const ride = rides[rideIndex];

    if (ride) {
        // Llenar los campos con los datos del ride
        fullnameInput.value = ride.RideName;
        startFrom.value = ride.StartFrom;
        end.value = ride.End;
        aboutMeTextarea.value = ride.AboutMe;
        departureInput.value = ride.Departure; // O usa otro campo que represente salida.
        arrivalInput.value = ride.EstimatedArrival;

        // Marcar los días seleccionados
        selectedDaysCheckboxes.forEach((checkbox) => {
            if (ride.SelectedDays.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }
}

// Guardar los cambios
if (document.getElementById("form-edit-ride")){
    document.getElementById("boton-save").addEventListener("click", (event) => {
        event.preventDefault();

        console.log("Se va a editar")

        const fullnameInput = document.getElementById("fullname");
        const startFrom = document.getElementById("startFrom");
        const end = document.getElementById("end");
        const aboutMeTextarea = document.getElementById("AboutMe");
        const selectedDaysCheckboxes = document.querySelectorAll("input[name='day']");
        const departureInput = document.querySelector("input[name='departure']");
        const arrivalInput = document.querySelector("input[name='arrival']");
    
        // Obtener los valores editados
        const updatedRide = {
            Username: localStorage.getItem("logueado"),
            RideName: fullnameInput.value,
            StartFrom: startFrom.value,
            End: end.value,
            AboutMe: aboutMeTextarea.value,
            Departure: departureInput.value,
            EstimatedArrival: arrivalInput.value,
            SelectedDays: Array.from(selectedDaysCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value)
        };
    
        // Obtener rides desde el Local Storage
        let rides = JSON.parse(localStorage.getItem("rides")) || [];

        // Asegurarte de que rideIndex sea un número
        const params = new URLSearchParams(window.location.search);
        const rideIndex = parseInt(params.get("rideIndex"), 10);

        console.log("ride index " + rideIndex)

        // Verificar si el índice es válido
        if (rideIndex >= 0 && rideIndex < rides.length) {
            // Actualizar el ride en el Local Storage
            console.log("Before update:", rides);
            rides[rideIndex] = updatedRide;
            console.log("After update:", rides);

            alert("Ride actualizado correctamente")
            console.log(rides)
            localStorage.setItem("rides", JSON.stringify(rides));
            window.location.href = "index.html"; // Redirigir al usuario después de guardar
        } else {
            alert("Error: The ride you are trying to edit does not exist.");
        }
    });
}





if (document.getElementById("title-settings")){
    console.log("En settings")
    loadUserData();

    document.getElementById("boton-save-profile").addEventListener("click", (event) => {
        saveUserData();
    })

}

// Función para cargar los datos del usuario
function loadUserData() {
    console.log("se llamó")
    const userData = localStorage.getItem("logueado");
    if (userData) {
        const user = JSON.parse(localStorage.getItem(userData));

        // Ajustar los campos del formulario a las propiedades del objeto usuario
        document.getElementById("fullname").value = user.FirstName + " " + user.LastName || '';
        document.getElementById("AboutMe").value = `${user.AboutMe}`;
    }
}

// Función para guardar los cambios
function saveUserData() {
    const fullName = document.getElementById("fullname").value;
    const AboutMe = document.getElementById("AboutMe").value;

    // Dividir nombre completo en FirstName y LastName
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    const userData = localStorage.getItem("logueado");
    if (userData) {
        const user = JSON.parse(localStorage.getItem(userData));
        
        user.FirstName = firstName;
        user.LastName = lastName;
        user.AboutMe = AboutMe;

        localStorage.setItem(user.Username, JSON.stringify(user));

        alert("Datos guardados correctamente.");
    } else {
        alert("Hubo un error al guardar los datos");
    }
}