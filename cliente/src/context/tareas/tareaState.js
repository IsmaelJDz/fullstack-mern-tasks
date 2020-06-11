import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

//import { v4 as uuidv4 } from 'uuid';
import clienteAxios from '../../config/axios';

/**
 * types
 */
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from '../../types/';

const TareaState = props => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null
  };

  // crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {
    try {
      const resultado = await clienteAxios.get('/api/tareas', {
        params: { proyecto }
      });
      dispatch({ type: TAREAS_PROYECTO, payload: resultado.data.tareas });
    } catch (error) {
      console.log(error);
    }
  };

  // Agregar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {
    //tarea.id = uuidv4();
    try {
      await clienteAxios.post('/api/tareas', tarea);
      dispatch({ type: AGREGAR_TAREA, payload: tarea });
    } catch (error) {
      console.log(error);
    }
  };

  // Valida y muestra un error en caso de ser necesario
  const validaTarea = () => {
    dispatch({ type: VALIDAR_TAREA });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {
        params: { proyecto }
      });
      dispatch({ type: ELIMINAR_TAREA, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  // //cambia el estado de cada tarea
  // const cambiaEstadoTarea = tarea => {
  //   dispatch({ type: ESTADO_TAREA, payload: tarea });
  // };

  // Extrae una tarea para edicion
  const guardarTareaActual = tarea => {
    dispatch({ type: TAREA_ACTUAL, payload: tarea });
  };

  //Actualiza una tarea
  const actualizarTarea = async tarea => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({ type: ACTUALIZAR_TAREA, payload: resultado.data.tarea });
    } catch (error) {
      console.log(error);
    }
  };

  // Limpia la tarea seleccionada del estado
  const limpiarTarea = () => {
    dispatch({ type: LIMPIAR_TAREA });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validaTarea,
        eliminarTarea,
        //cambiaEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
