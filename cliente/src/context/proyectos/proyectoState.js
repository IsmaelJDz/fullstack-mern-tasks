import React, { useReducer } from 'react';
//import { v4 as uuidv4 } from "uuid";

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

/** Types */
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from '../../types';

import clienteAxios from '../../config/axios';
import ContextDevTool from 'react-context-devtool';

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formularioShow: false,
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };

  // Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      };
      dispatch({ type: PROYECTO_ERROR, payload: alerta });
    }
  };

  //Agregar nuevo proyecto
  const agregarProyecto = async proyecto => {
    //proyecto.id = uuidv4();

    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      // Inserta el proyecto en el estate
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      };
      dispatch({ type: PROYECTO_ERROR, payload: alerta });
    }
  };

  // Valida el formulario por errores
  const mostrarError = () => {
    dispatch({ type: VALIDAR_FORMULARIO });
  };

  // Seleciona el proyeto que el usuario da click
  const proyectoActual = proyectoId => {
    dispatch({ type: PROYECTO_ACTUAL, payload: proyectoId });
  };

  const eliminaProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({ type: ELIMINAR_PROYECTO, payload: proyectoId });
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      };
      dispatch({ type: PROYECTO_ERROR, payload: alerta });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formularioShow,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminaProyecto
      }}
    >
      <ContextDevTool
        context={proyectoContext}
        id="uniqContextId"
        displayName="Context Display Name"
      />
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
