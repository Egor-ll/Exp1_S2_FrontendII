
import { NavLink } from 'react-router-dom';

function MenuInventario() {
    const clasesEnlace = ({ isActive }) =>
        `inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold no-underline transition-all duration-200 ${
            isActive
                ? 'bg-[#176b45] text-white shadow-md'
                : 'text-[#24543d] hover:bg-[#e8f4ec] hover:text-[#176b45]'
        }`;

    return (
        <nav
            className="flex flex-wrap items-center justify-center gap-3 border-b border-[#e1e9e3] bg-white px-4 py-4 sm:gap-4 sm:px-6"
            aria-label="Navegación principal"
        >
            <NavLink to="/" end className={clasesEnlace}>
                Inicio
            </NavLink>

            <NavLink
                to="/agregar-articulo"
                className={clasesEnlace}
            >
                Agregar artículos
            </NavLink>

            <NavLink
                to="/inventario"
                className={clasesEnlace}
            >
                Inventario
            </NavLink>
        </nav>
    );
}

export default MenuInventario;
