
import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';

import MenuInferior from './componentes/MenuInferior.jsx';
import MenuInventario from './componentes/MenuInventario.jsx';

import Home from './pages/Home.jsx';
import QuienesSomos from './pages/QuienesSomos.jsx';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes.jsx';
import AgregarArticulo from './pages/AgregarArticulo.jsx';
import Inventario from './pages/Inventario.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f4f7f4] text-[#24352c]">

            {/* Encabezado principal */}
            <header className="flex flex-col items-start justify-between gap-5 border-b border-[#e4ebe5] bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-10 lg:px-[6%]">

                <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#176b45] text-2xl font-extrabold text-white">
                        S
                    </span>

                    <div>
                        <h2 className="text-xl font-bold text-[#24352c]">
                            Supermercado
                        </h2>

                        <p className="mt-1 text-sm text-[#718076]">
                            Gestión de inventario
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-[#e9f5ed] px-4 py-2 text-sm font-semibold text-[#176b45]">
                    Sistema de gestión
                </span>
            </header>

            {/* Navegación principal */}
            <MenuInventario />

            {/* Contenido de las rutas */}
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/quienes-somos"
                        element={<QuienesSomos />}
                    />

                    <Route
                        path="/preguntas-frecuentes"
                        element={<PreguntasFrecuentes />}
                    />

                    <Route
                        path="/agregar-articulo"
                        element={<AgregarArticulo />}
                    />

                    <Route
                        path="/inventario"
                        element={<Inventario />}
                    />

                    <Route
                        path="/inicio"
                        element={<Navigate to="/" replace />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            {/* Navegación informativa */}
            <MenuInferior />

            {/* Pie de página */}
            <footer className="border-t border-[#e3eae4] bg-white px-4 py-4 text-center text-xs text-[#718076]">
                <p>
                    Supermercado · Sistema de gestión de inventario
                </p>
            </footer>
        </div>
    );
}

export default App;
