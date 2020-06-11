import React from 'react';

/** Libraries */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/** Components */
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

/** HOC to render component if is autenticated or not */
import RutaPrivada from './components/rutas/RutaPrivada';

/** Component Context API */
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';

/** check or remove the token in header */

import tokenAuth from '../src/config/token';

// Revisar si tenemos un token para tratar de loger al usuario
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
