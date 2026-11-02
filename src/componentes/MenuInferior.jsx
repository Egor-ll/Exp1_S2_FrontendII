
import { NavLink } from 'react-router-dom';

function MenuInferior() {
    const clasesEnlace = ({ isActive }) =>
        `rounded-xl px-5 py-3 text-sm font-semibold no-underline transition-all duration-200 ${
            isActive
                ? 'bg-[#176b45] text-white shadow-md'
                : 'text-[#53645a] hover:bg-[#e8f4ec] hover:text-[#176b45]'
        }`;

    return (
        <nav
            className="flex flex-wrap items-center justify-center gap-3 border-t border-[#e3eae4] bg-white p-5"
            aria-label="Información"
        >
            <NavLink
                to="/quienes-somos"
                className={clasesEnlace}
            >
                Quiénes somos
            </NavLink>

            <NavLink
                to="/preguntas-frecuentes"
                className={clasesEnlace}
            >
                Preguntas frecuentes
            </NavLink>
        </nav>
    );
}

export default MenuInferior;
