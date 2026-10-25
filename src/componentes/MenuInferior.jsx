
import { NavLink } from 'react-router-dom';

function MenuInferior() {
    return (
        <nav className="menu-inferior" aria-label="Navegación principal">
            <NavLink to="/" end>
                Inicio
            </NavLink>

            <NavLink to="/quienes-somos">
                Quiénes somos
            </NavLink>

            <NavLink to="/preguntas-frecuentes">
                Preguntas frecuentes
            </NavLink>
        </nav>
    );
}

export default MenuInferior;
