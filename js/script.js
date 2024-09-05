// Cargar tareas almacenadas en el Local Storage al iniciar
document.addEventListener('DOMContentLoaded', cargarTareas);

// Función para cargar tareas almacenadas
function cargarTareas() {
    let tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        let listaTareas = JSON.parse(tareasGuardadas);
        listaTareas.forEach(tarea => {
            crearTarea(tarea.texto, tarea.completada);
        });
    }
}

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

    // Crear contenedor para los botones (Check y Eliminar)
    let contenedorBotones = document.createElement("div");

    // Crear botón de check (completar tarea)
    let botonCheck = document.createElement("button");
    let iconoCheck = document.createElement("i");
    iconoCheck.className = "fas fa-check-circle";  // Cambiar a fa-check-circle
    botonCheck.appendChild(iconoCheck);

    // Evento para marcar como completada la tarea
    botonCheck.onclick = function() {
        nuevaTarea.classList.toggle("completada");
        actualizarEstadoTarea(tareaTexto, nuevaTarea.classList.contains("completada"));
    };

    // Crear botón de eliminar con icono
    let botonEliminar = document.createElement("button");
    let iconoEliminar = document.createElement("i");
    iconoEliminar.className = "fas fa-trash-can";  // Cambiar a fa-trash-can
    botonEliminar.appendChild(iconoEliminar);

    // Evento de clic para eliminar la tarea con animación
    botonEliminar.onclick = function() {
        nuevaTarea.classList.add("salida");
        nuevaTarea.addEventListener("animationend", function() {
            nuevaTarea.remove();
            eliminarTarea(tareaTexto);
        });
    };

    // Agregar los botones al contenedor
    contenedorBotones.appendChild(botonCheck);
    contenedorBotones.appendChild(botonEliminar);

    // Agregar contenedor de botones y tarea al elemento de lista
    nuevaTarea.appendChild(contenedorBotones);
    document.getElementById("listaTareas").appendChild(nuevaTarea);
}

// Función para guardar una tarea en el Local Storage
function guardarTarea(tareaTexto, completada) {
    let tareasGuardadas = localStorage.getItem('tareas');
    let listaTareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    listaTareas.push({ texto: tareaTexto, completada: completada });
    localStorage.setItem('tareas', JSON.stringify(listaTareas));
}

// Función para actualizar el estado de una tarea en el Local Storage
function actualizarEstadoTarea(tareaTexto, completada) {
    let tareasGuardadas = localStorage.getItem('tareas');
    let listaTareas = JSON.parse(tareasGuardadas);
    listaTareas = listaTareas.map(tarea => {
        if (tarea.texto === tareaTexto) {
            return { texto: tareaTexto, completada: completada };
        }
        return tarea;
    });
    localStorage.setItem('tareas', JSON.stringify(listaTareas));
}

// Función para eliminar una tarea del Local Storage
function eliminarTarea(tareaTexto) {
    let tareasGuardadas = localStorage.getItem('tareas');
    let listaTareas = JSON.parse(tareasGuardadas);
    listaTareas = listaTareas.filter(tarea => tarea.texto !== tareaTexto);
    localStorage.setItem('tareas', JSON.stringify(listaTareas));
}

// Código para mostrar la fecha
let fechaHoy = new Date();
let dia = fechaHoy.getDate();
let mes = fechaHoy.getMonth() + 1;
let anio = fechaHoy.getFullYear();
if (dia < 10) dia = '0' + dia;
if (mes < 10) mes = '0' + mes;
let fechaFormateada = dia + '/' + mes + '/' + anio;
document.getElementById("fecha").textContent = fechaFormateada;
