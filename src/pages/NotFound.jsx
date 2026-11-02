
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="flex min-h-[65vh] items-center justify-center px-4 py-12">
            <section className="w-full max-w-xl rounded-2xl border border-[#e3eae4] bg-white p-8 text-center shadow-lg sm:p-12">

                <span className="mb-4 block text-7xl font-extrabold tracking-tight text-[#176b45] sm:text-8xl">
                    404
                </span>

                <h1 className="mb-4 text-2xl font-bold text-[#24352c] sm:text-3xl">
                    Página no encontrada
                </h1>

                <p className="mb-8 leading-7 text-[#64736a]">
                    Lo sentimos, la página que buscas no existe
                    o la dirección ingresada es incorrecta.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-xl bg-[#176b45] px-6 py-3 font-semibold text-white no-underline shadow-sm transition-colors duration-200 hover:bg-[#105536] focus:outline-2 focus:outline-offset-2 focus:outline-[#176b45]"
                >
                    Volver al inicio
                </Link>

            </section>
        </main>
    );
}

export default NotFound;
