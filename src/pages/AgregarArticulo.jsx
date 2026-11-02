
import { useState } from 'react';
import { useInventario } from '../context/useInventario.js';

function AgregarArticulo() {
    const { agregarProducto } = useInventario();

    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [tipo, setTipo] = useState('');
    const [stock, setStock] = useState('1');
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    async function manejarEnvio(event) {
        event.preventDefault();

        setMensaje('');
        setError('');

        const cantidad = Number(stock);

        if (!Number.isInteger(cantidad) || cantidad < 0) {
            setError(
                'El stock debe ser un número entero igual o mayor que cero.'
            );
            return;
        }

        try {
            setGuardando(true);

            await agregarProducto({
                nombre: nombre.trim(),
                marca: marca.trim(),
                tipo,
                stock: cantidad,
            });

            setNombre('');
            setMarca('');
            setTipo('');
            setStock('1');

            setMensaje('¡Artículo registrado correctamente!');
        } catch (err) {
            setError(err.message || 'No se pudo registrar el artículo.');
        } finally {
            setGuardando(false);
        }
    }

    const clasesCampo =
        'w-full rounded-xl border border-[#d6e1d8] bg-white px-4 py-3 text-[#24352c] outline-none transition focus:border-[#176b45] focus:ring-2 focus:ring-[#176b45]/20';

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

            <section className="mb-8 rounded-2xl bg-[#176b45] p-6 text-white shadow-lg sm:p-8">
                <p className="mb-3 text-xs font-extrabold tracking-[1.5px] text-[#b9e7ca]">
                    GESTIÓN DE INVENTARIO
                </p>

                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Agregar artículos
                </h1>

                <p className="leading-7 text-[#e0f0e5]">
                    Registra nuevos productos en el inventario
                    del supermercado.
                </p>
            </section>

            <section className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-lg sm:p-8">

                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#176b45]">
                            Registrar nuevo artículo
                        </h2>

                        <p className="mt-2 text-sm text-[#64736a]">
                            Completa los datos del producto.
                        </p>
                    </div>

                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#e9f5ed] text-2xl font-bold text-[#176b45]">
                        ＋
                    </span>
                </div>

                <form onSubmit={manejarEnvio}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="nombre"
                                className="text-sm font-semibold text-[#53645a]"
                            >
                                Nombre del artículo
                            </label>

                            <input
                                className={clasesCampo}
                                id="nombre"
                                type="text"
                                placeholder="Ej. Arroz"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                maxLength={80}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="marca"
                                className="text-sm font-semibold text-[#53645a]"
                            >
                                Marca
                            </label>

                            <input
                                className={clasesCampo}
                                id="marca"
                                type="text"
                                placeholder="Ej. Tucapel"
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                                maxLength={80}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="tipo"
                                className="text-sm font-semibold text-[#53645a]"
                            >
                                Tipo de producto
                            </label>

                            <select
                                className={clasesCampo}
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option value="">
                                    Selecciona una categoría
                                </option>
                                <option value="Abarrotes">Abarrotes</option>
                                <option value="Lácteos">Lácteos</option>
                                <option value="Panadería">Panadería</option>
                                <option value="Frutas y verduras">
                                    Frutas y verduras
                                </option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Limpieza">Limpieza</option>
                                <option value="Congelados">Congelados</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="stock"
                                className="text-sm font-semibold text-[#53645a]"
                            >
                                Stock inicial
                            </label>

                            <input
                                className={clasesCampo}
                                id="stock"
                                type="number"
                                min="0"
                                step="1"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {mensaje && (
                        <p
                            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800"
                            role="status"
                        >
                            {mensaje}
                        </p>
                    )}

                    {error && (
                        <p
                            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <div className="mt-8 flex justify-end">
                        <button
                            className="w-full rounded-xl bg-[#176b45] px-6 py-3 font-bold text-white shadow-sm transition duration-200 hover:bg-[#105536] focus:outline-2 focus:outline-offset-2 focus:outline-[#176b45] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? 'Guardando...'
                                : '+ Registrar artículo'}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default AgregarArticulo;
