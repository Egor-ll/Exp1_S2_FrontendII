
import { Link } from 'react-router-dom';
import { useInventario } from '../context/useInventario.js';

function Home() {
    const {
        productos,
        cargando,
        error,
    } = useInventario();

    const unidadesTotales = productos.reduce(
        (total, producto) => total + Number(producto.stock || 0),
        0
    );

    const productosStockBajo = productos.filter(
        producto => Number(producto.stock) < 10
    ).length;

    const tarjetas = [
        {
            titulo: 'Productos registrados',
            valor: productos.length,
            descripcion: 'Artículos disponibles en el sistema',
        },
        {
            titulo: 'Unidades en inventario',
            valor: unidadesTotales,
            descripcion: 'Total de unidades registradas',
        },
    ];

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

            <section className="mb-8 rounded-2xl bg-[#176b45] p-6 text-white shadow-lg sm:p-8">
                <p className="mb-3 text-xs font-extrabold tracking-[1.5px] text-[#b9e7ca]">
                    GESTIÓN DE INVENTARIO
                </p>

                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Control de inventario
                </h1>

                <p className="max-w-3xl leading-7 text-[#e0f0e5]">
                    Administra los productos y consulta las existencias
                    del supermercado.
                </p>
            </section>

            {error && (
                <p
                    className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                    role="alert"
                >
                    {error}
                </p>
            )}

            <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {tarjetas.map((tarjeta) => (
                    <article
                        key={tarjeta.titulo}
                        className="flex flex-col gap-3 rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-8"
                    >
                        <span className="text-sm font-semibold text-[#718076]">
                            {tarjeta.titulo}
                        </span>

                        <strong className="text-4xl font-extrabold text-[#176b45]">
                            {cargando ? '...' : tarjeta.valor}
                        </strong>

                        <p className="text-sm text-[#64736a]">
                            {tarjeta.descripcion}
                        </p>
                    </article>
                ))}

                <Link
                    to="/inventario?filtro=stock-bajo"
                    className="flex flex-col gap-3 rounded-2xl border border-[#e3eae4] bg-white p-6 text-left no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#176b45] hover:shadow-md sm:p-8"
                    aria-label="Ver productos con stock bajo en el inventario"
                >
                    <span className="text-sm font-semibold text-[#718076]">
                        Productos con stock bajo
                    </span>

                    <strong className="text-4xl font-extrabold text-[#a75b12]">
                        {cargando ? '...' : productosStockBajo}
                    </strong>

                    <span className="text-sm font-semibold text-[#176b45]">
                        Ver artículos que necesitan reposición →
                    </span>
                </Link>

            </section>
        </main>
    );
}

export default Home;
