import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = props => {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { registrarUsuario, mensaje, autenticado } = authContext;

  // En caso de que el usuario se halla autenticado, registrado o duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push('/proyectos');
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  /** Local State for initial sesion */
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  // extraer de usuario
  const { nombre, email, password, confirmar } = usuario;

  const onChangeRegister = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //validForm que no halla campos vacios
    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmar === ''
    ) {
      mostrarAlerta('Todos los campos son obligarorios', 'alerta-error');
      return;
    }

    //minimun length password equals 6 characters
    if (password.length < 6) {
      mostrarAlerta(
        'El password debe ser de al menos 6 caracteres',
        'alerta-error'
      );
      return;
    }

    //two passwords will be equals
    if (password !== confirmar) {
      mostrarAlerta('Los password no son iguales', 'alerta-error');
      return;
    }

    //sendToAction
    registrarUsuario({
      nombre,
      email,
      password
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChangeRegister}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={onChangeRegister}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              value={password}
              onChange={onChangeRegister}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu password"
              value={confirmar}
              onChange={onChangeRegister}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarse"
            />
          </div>
        </form>

        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
          Volver a iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
