
import { useState } from 'react';
import { useInventario } from '../context/useInventario.js';
import { useSearchParams } from 'react-router-dom';

function Inventario() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filtroActivo = searchParams.get('filtro') === 'stock-bajo';

    const {
        productos,
        cargando,
        error,
        eliminarProducto,
        descontarStock,
    } = useInventario();

    const productosFiltrados = filtroActivo
        ? productos.filter(producto => Number(producto.stock) < 10)
        : productos;

    const [cantidades, setCantidades] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [errorAccion, setErrorAccion] = useState('');
    const [procesando, setProcesando] = useState(null);

    async function manejarDescuento(producto) {
        const cantidad = Number(cantidades[producto.id]);

        setMensaje('');
        setErrorAccion('');

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            setErrorAccion(
                'Ingresa una cantidad entera mayor que cero.'
            );
            return;
        }

        if (cantidad > producto.stock) {
            setErrorAccion(
                `Solo existen ${producto.stock} unidades de ${producto.nombre}.`
            );
            return;
        }

        try {
            setProcesando(producto.id);

            await descontarStock(producto.id, cantidad);

            setCantidades(actuales => ({
                ...actuales,
                [producto.id]: '',
            }));

            setMensaje(
                `Se descontaron ${cantidad} unidades de ${producto.nombre}.`
            );
        } catch (err) {
            setErrorAccion(err.message);
        } finally {
            setProcesando(null);
        }
    }

    async function manejarEliminacion(producto) {
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar completamente "${producto.nombre}"?`
        );

        if (!confirmar) return;

        try {
            setProcesando(producto.id);
            setErrorAccion('');
            setMensaje('');

            await eliminarProducto(producto.id);

            setMensaje(
                `Artículo "${producto.nombre}" eliminado correctamente.`
            );
        } catch (err) {
            setErrorAccion(err.message);
        } finally {
            setProcesando(null);
        }
    }

    const clasesFiltro = activo =>
        `rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 ${
            activo
                ? 'border-[#176b45] bg-[#176b45] text-white shadow-sm'
                : 'border-[#d3e0d6] bg-white text-[#24543d] hover:bg-[#e8f4ec]'
        }`;

    const clasesBoton =
        'rounded-lg px-3 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50';

    if (cargando) {
        return (
            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
                <div className="rounded-2xl border border-[#e3eae4] bg-white p-8 text-center shadow-sm">
                    <p className="font-semibold text-[#64736a]">
                        Cargando inventario...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

            <section className="mb-8 rounded-2xl bg-[#176b45] p-6 text-white shadow-lg sm:p-8">
                <p className="mb-3 text-xs font-extrabold tracking-[1.5px] text-[#b9e7ca]">
                    GESTIÓN DE INVENTARIO
                </p>

                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Inventario de artículos
                </h1>

                <p className="leading-7 text-[#e0f0e5]">
                    Consulta y administra las existencias del supermercado.
                </p>
            </section>

            {error && (
                <p
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {mensaje && (
                <p
                    className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800"
                    role="status"
                >
                    {mensaje}
                </p>
            )}

            {errorAccion && (
                <p
                    className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                    role="alert"
                >
                    {errorAccion}
                </p>
            )}

            <section className="overflow-hidden rounded-2xl border border-[#e3eae4] bg-white p-5 shadow-lg sm:p-7">

                <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold text-[#176b45]">
                            {filtroActivo
                                ? 'Productos con stock bajo'
                                : 'Productos registrados'}
                        </h2>

                        <p className="mt-2 text-sm text-[#64736a]">
                            Mostrando {productosFiltrados.length} de{' '}
                            {productos.length} artículos
                        </p>
                    </div>

                    <span className="rounded-xl bg-[#e9f5ed] px-4 py-2 text-sm font-bold text-[#176b45]">
                        {productos.length} productos
                    </span>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        className={clasesFiltro(!filtroActivo)}
                        onClick={() => setSearchParams({})}
                    >
                        Todos los artículos
                    </button>

                    <button
                        type="button"
                        className={clasesFiltro(filtroActivo)}
                        onClick={() =>
                            setSearchParams({ filtro: 'stock-bajo' })
                        }
                    >
                        Stock bajo
                    </button>
                </div>

                {productosFiltrados.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#d3e0d6] bg-[#f8faf8] px-5 py-12 text-center">
                        <p className="font-semibold text-[#64736a]">
                            {filtroActivo
                                ? '¡Excelente! No existen artículos con stock bajo.'
                                : 'No existen artículos registrados.'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-[#e5ece6]">
                        <table className="w-full min-w-[1050px] border-collapse text-left">
                            <thead className="bg-[#f4f7f4]">
                            <tr className="text-xs font-bold uppercase tracking-wide text-[#718076]">
                                <th className="px-4 py-4">ID</th>
                                <th className="px-4 py-4">Nombre</th>
                                <th className="px-4 py-4">Marca</th>
                                <th className="px-4 py-4">Tipo de producto</th>
                                <th className="px-4 py-4">Stock</th>
                                <th className="px-4 py-4">Descontar unidades</th>
                                <th className="px-4 py-4">Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {productosFiltrados.map(producto => (
                                <tr
                                    key={producto.id}
                                    className="border-t border-[#e9eee9] transition-colors hover:bg-[#f8faf8]"
                                >
                                    <td className="px-4 py-4 text-sm text-[#64736a]">
                                        {producto.id}
                                    </td>

                                    <td className="px-4 py-4 text-sm font-semibold text-[#24352c]">
                                        {producto.nombre}
                                    </td>

                                    <td className="px-4 py-4 text-sm text-[#64736a]">
                                        {producto.marca}
                                    </td>

                                    <td className="px-4 py-4 text-sm text-[#64736a]">
                                        {producto.tipo}
                                    </td>

                                    <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
                                                    Number(producto.stock) < 10
                                                        ? 'bg-[#fff0df] text-[#a75b12]'
                                                        : 'bg-[#e7f5eb] text-[#176b45]'
                                                }`}
                                            >
                                                {producto.stock}
                                            </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                className="w-24 rounded-lg border border-[#d3e0d6] px-3 py-2 text-sm outline-none focus:border-[#176b45] focus:ring-2 focus:ring-[#176b45]/20"
                                                type="number"
                                                min="1"
                                                max={producto.stock}
                                                step="1"
                                                placeholder="Cantidad"
                                                aria-label={`Cantidad a descontar de ${producto.nombre}`}
                                                value={cantidades[producto.id] ?? ''}
                                                onChange={event =>
                                                    setCantidades(actuales => ({
                                                        ...actuales,
                                                        [producto.id]: event.target.value,
                                                    }))
                                                }
                                            />

                                            <button
                                                className={`${clasesBoton} bg-[#176b45] text-white hover:bg-[#105536]`}
                                                type="button"
                                                disabled={
                                                    procesando === producto.id ||
                                                    Number(producto.stock) === 0
                                                }
                                                onClick={() =>
                                                    manejarDescuento(producto)
                                                }
                                            >
                                                {procesando === producto.id
                                                    ? 'Procesando...'
                                                    : 'Descontar'}
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        <button
                                            className={`${clasesBoton} border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white`}
                                            type="button"
                                            disabled={procesando === producto.id}
                                            onClick={() =>
                                                manejarEliminacion(producto)
                                            }
                                        >
                                            Eliminar artículo
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Inventario;
