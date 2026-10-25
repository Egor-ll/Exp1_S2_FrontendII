
import { Route, Routes } from 'react-router-dom';
import MenuInferior from './componentes/MenuInferior.jsx';
import Home from './pages/Home.jsx';
import QuienesSomos from './pages/QuienesSomos.jsx';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx';

function App() {
  return (
      <div className="aplicacion">
        <header className="encabezado">
          <div className="marca">
            <span className="marca-icono">S</span>
            <div>
              <h2>Supermercado</h2>
              <p>Gestión de inventario</p>
            </div>
          </div>
          <span className="indicador">Sistema de gestión</span>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route
              path="/preguntas-frecuentes"
              element={<PreguntasFrecuentes />}
          />
        </Routes>

        <MenuInferior />

        <footer className="pie">
          <p>Supermercado · Sistema de gestión de inventario</p>
        </footer>
      </div>
  );
}

export default App;
