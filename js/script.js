function agregarTarea() {
    // Obtener el valor del campo de texto de la tarea
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value;

    // Validar que el campo no esté vacío
    if (nuevaTareaTexto.trim() === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }

    // Crear nuevo elemento de lista (li)
    let nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = nuevaTareaTexto;

    // Crear botón de eliminar con icono
    let botonEliminar = document.createElement("button");
    
    // Agregar el icono de Font Awesome dentro del botón
    let iconoEliminar = document.createElement("i");
    iconoEliminar.className = "fas fa-trash-alt";
    botonEliminar.appendChild(iconoEliminar);

    // Evento de clic para eliminar la tarea con animación
    botonEliminar.onclick = function() {
        nuevaTarea.classList.add("salida");
        nuevaTarea.addEventListener("animationend", function() {
            nuevaTarea.remove();
        });
    };

    // Agregar botón de eliminar al elemento de la lista
    nuevaTarea.appendChild(botonEliminar);

    // Agregar nueva tarea a la lista
    document.getElementById("listaTareas").appendChild(nuevaTarea);

    // Limpiar el campo de texto
    document.getElementById("nuevaTarea").value = "";
}


// Obtener la fecha actual
let fechaHoy = new Date();

// Formatear la fecha como 'día/mes/año'
let dia = fechaHoy.getDate();
let mes = fechaHoy.getMonth() + 1; // Los meses en JavaScript son base 0 (0 = Enero, 11 = Diciembre)
let anio = fechaHoy.getFullYear();

// Formatear para agregar un cero si el día o el mes tienen un solo dígito
if (dia < 10) {
    dia = '0' + dia;
}
if (mes < 10) {
    mes = '0' + mes;
}

// Crear la fecha en formato 'DD/MM/AAAA'
let fechaFormateada = dia + '/' + mes + '/' + anio;

// Insertar la fecha en el elemento HTML con id="fecha"
document.getElementById("fecha").textContent = fechaFormateada;
