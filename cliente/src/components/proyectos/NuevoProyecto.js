import React, { useState, useContext } from "react";

/** Component Context API */
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError
  } = proyectosContext;

  // local state for the project
  const [proyecto, setProyecto] = useState({
    nombre: ""
  });

  // extract data
  const { nombre } = proyecto;

  // read the inputs content
  const onChangeProyecto = e => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  // when the user send the project
  const onSubmitProyecto = e => {
    e.preventDefault();

    //validate the project
    if (nombre === "") {
      mostrarError();
      return;
    }

    //add the state
    agregarProyecto(proyecto);

    // Reiniciar el form
    setProyecto({
      nombre: ""
    });
  };

  const handleShowForm = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={handleShowForm}
      >
        Nuevo proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          ></input>
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          ></input>
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
