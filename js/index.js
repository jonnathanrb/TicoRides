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

if (botonSave){
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
                // Aquí puedes agregar la lógica para editar el ride, por ejemplo redirigir a una página de edición
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
        });
}