import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

/** Components */
import Tarea from './Tarea';

/** Component Context API */
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {
  // Obtener el state de proyectos

  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminaProyecto } = proyectosContext;

  // trae las tareas del context
  const tareasContext = useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // const tareasProyecto = [
  //   { nombre: "Elegir plataforma", estado: true },
  //   { nombre: "Elegir colores", estado: false },
  //   { nombre: "Elegir plataforma de pago", estado: false },
  //   { nombre: "Elegir hosting", estado: true }
  // ];

  //Se elimina porque ya estamos trayendo las tareas del context
  //const tareasProyecto = [];

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>

      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea, index) => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        onClick={() => eliminaProyecto(proyectoActual._id)}
        type="button"
        className="btn btb-eliminar"
      >
        Eliminar proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
