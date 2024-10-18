// Función para agregar una nueva tarea
function agregarTarea() {
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value;

    if (nuevaTareaTexto.trim() === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }

    crearTarea(nuevaTareaTexto, false);
    guardarTarea(nuevaTareaTexto, false);

    // Limpiar el campo de texto
    document.getElementById("nuevaTarea").value = "";
}

// Función para crear una tarea en el DOM
function crearTarea(tareaTexto, completada) {
    let nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = tareaTexto;

    if (completada) {
        nuevaTarea.classList.add("completada");
    }

    // Crear contenedor para los botones (Check, Editar y Eliminar)
    let contenedorBotones = document.createElement("div");

    // Crear botón de check (completar tarea)
    let botonCheck = document.createElement("button");
    let iconoCheck = document.createElement("i");
    iconoCheck.className = "fas fa-check-circle";
    botonCheck.appendChild(iconoCheck);

    // Evento para marcar como completada o eliminar la tarea si ya está completada
    botonCheck.onclick = function () {
        if (nuevaTarea.classList.contains("completada")) {
            // Si ya está completada, eliminar la tarea
            nuevaTarea.classList.add("salida");
            nuevaTarea.addEventListener("animationend", function () {
                nuevaTarea.remove();
                eliminarTarea(tareaTexto);
            });
        } else {
            // Si no está completada, marcarla como completada (tachada)
            nuevaTarea.classList.toggle("completada");
            actualizarEstadoTarea(tareaTexto, nuevaTarea.classList.contains("completada"));
        }
    };

    // Crear botón de editar tarea
    let botonEditar = document.createElement("button");
    let iconoEditar = document.createElement("i");
    iconoEditar.className = "fas fa-edit"; // Icono de edición
    botonEditar.appendChild(iconoEditar);

    // Evento para editar la tarea
    botonEditar.onclick = function () {
        let nuevoTexto = prompt("Edita tu tarea:", tareaTexto);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            // Actualiza el texto de la tarea en el DOM
            nuevaTarea.firstChild.textContent = nuevoTexto;
            // Actualiza la tarea en el localStorage
            actualizarTextoTarea(tareaTexto, nuevoTexto);
            tareaTexto = nuevoTexto; // Actualiza la referencia del texto
        }
    };

    // Crear botón de eliminar con icono
    let botonEliminar = document.createElement("button");
    let iconoEliminar = document.createElement("i");
    iconoEliminar.className = "fas fa-trash-can";
    botonEliminar.appendChild(iconoEliminar);

    // Evento de clic para eliminar la tarea con animación
    botonEliminar.onclick = function () {
        nuevaTarea.classList.add("salida");
        nuevaTarea.addEventListener("animationend", function () {
            nuevaTarea.remove();
            eliminarTarea(tareaTexto);
        });
    };

    // Agregar los botones al contenedor
    contenedorBotones.appendChild(botonCheck);
    contenedorBotones.appendChild(botonEditar);
    contenedorBotones.appendChild(botonEliminar);

    // Agregar contenedor de botones y tarea al elemento de lista
    nuevaTarea.appendChild(contenedorBotones);
    document.getElementById("listaTareas").appendChild(nuevaTarea);
}

// Función para actualizar el texto de una tarea en el Local Storage
function actualizarTextoTarea(tareaTextoAntiguo, tareaTextoNuevo) {
    let tareasGuardadas = localStorage.getItem('tareas');
    let listaTareas = JSON.parse(tareasGuardadas);
    listaTareas = listaTareas.map(tarea => {
        if (tarea.texto === tareaTextoAntiguo) {
            return { texto: tareaTextoNuevo, completada: tarea.completada };
        }
        return tarea;
    });
    localStorage.setItem('tareas', JSON.stringify(listaTareas));
}

// Otras funciones de almacenamiento (guardarTarea, actualizarEstadoTarea, eliminarTarea, cargarTareas) permanecen iguales.

document.addEventListener('DOMContentLoaded', function() {
    // Código para mostrar la fecha
    let fechaHoy = new Date();
    let dia = fechaHoy.getDate();
    let mes = fechaHoy.getMonth() + 1; // Los meses en JS van de 0 a 11
    let anio = fechaHoy.getFullYear();
    
    if (dia < 10) dia = '0' + dia;  // Añadir un cero si el día es menor a 10
    if (mes < 10) mes = '0' + mes;  // Añadir un cero si el mes es menor a 10
    
    let fechaFormateada = dia + '/' + mes + '/' + anio;
    document.getElementById("fecha").textContent = fechaFormateada;
});


document.addEventListener('DOMContentLoaded', function() {
    // Código para mostrar la fecha
    let fechaHoy = new Date();
    let dia = fechaHoy.getDate();
    let mes = fechaHoy.getMonth() + 1;
    let anio = fechaHoy.getFullYear();
    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;
    let fechaFormateada = dia + '/' + mes + '/' + anio;
    document.getElementById("fecha").textContent = fechaFormateada;

    // Solicitar el nombre del usuario
    let nombreUsuario = localStorage.getItem('nombreUsuario');

    if (!nombreUsuario) {
        // Si no hay nombre en el localStorage, solicitar el nombre
        nombreUsuario = prompt("Por favor, ingresa tu nombre:");
        if (nombreUsuario) {
            localStorage.setItem('nombreUsuario', nombreUsuario);
        }
    }

    // Mostrar el nombre del usuario en el mensaje de bienvenida
    if (nombreUsuario) {
        document.querySelector('h1').textContent = `Bienvenido, ${nombreUsuario}!✨`;
    }
});
