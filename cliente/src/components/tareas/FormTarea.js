import React, { useContext, useState, useEffect } from 'react';

/** Component Context API */
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

// TODO:

const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Extraer la function del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    agregarTarea,
    validaTarea,
    obtenerTareas,
    tareaSeleccionada,
    actualizarTarea,
    limpiarTarea
  } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({ nombre: '' });
    }
  }, [tareaSeleccionada]);

  // State del formulario
  const [tarea, setTarea] = useState({
    nombre: ''
  });

  // extraer el nombre del proyecto
  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = event => {
    setTarea({
      ...tarea,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    //validar
    if (nombre.trim() === '') {
      validaTarea();
      return;
    }

    // Si es edicion o es nueva tarea
    if (tareaSeleccionada === null) {
      //agregar nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      //tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);
      // elimina tarea selecionada del state
      limpiarTarea();
    }

    //Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual._id);

    //reiniciarl el form
    setTarea({
      nombre: ''
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contnedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? 'Editar tarea' : 'Agregar tarea'}
          />
        </div>
      </form>

      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
