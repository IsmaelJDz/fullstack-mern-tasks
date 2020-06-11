import React, { useContext } from 'react';

/** Component Context API */
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

/**
 * MyMethod
 * @param: tarea comes from ListTarea
 * * ListTask
 */

const Tarea = ({ tarea }) => {
  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    //cambiaEstadoTarea,
    actualizarTarea,
    guardarTareaActual
  } = tareasContext;

  //Extraer el proyecto
  const [proyectoActual] = proyecto;

  //funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };

  // Funcion que modifica el estado de las tareas
  const cambiarEstado = tarea => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    //cambiaEstadoTarea(tarea);
    actualizarTarea(tarea);
  };

  // Agrega una tarea actual cuando el usuario dese editarla
  const seleccionarTarea = tarea => {
    guardarTareaActual(tarea);
  };

  return (
    <>
      <li className="tarea sombra">
        <p> {tarea.nombre} </p>
        <div className="estado">
          {tarea.estado ? (
            <button
              type="button"
              className="completo"
              onClick={() => cambiarEstado(tarea)}
            >
              Completo
            </button>
          ) : (
            <button
              type="button"
              className="incompleto"
              onClick={() => cambiarEstado(tarea)}
            >
              Incompleto
            </button>
          )}
        </div>

        <div className="acciones">
          <button
            type="button"
            className="btn btn-primario"
            onClick={() => seleccionarTarea(tarea)}
          >
            Editar
          </button>
          <button
            onClick={() => tareaEliminar(tarea._id)}
            type="button"
            className="btn btn-secundario"
          >
            Eliminar
          </button>
        </div>
      </li>
    </>
  );
};

export default Tarea;
