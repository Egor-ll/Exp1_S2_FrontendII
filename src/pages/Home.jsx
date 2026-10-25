
import { useEffect, useState } from 'react';

function Home() {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('Abarrotes');
    const [stock, setStock] = useState('1');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);

    async function cargarProductos() {
        try {
            setCargando(true);

            const respuesta = await fetch('/api/productos');

            if (!respuesta.ok) {
                throw new Error('No se pudo consultar el inventario.');
            }

            const datos = await respuesta.json();
            setProductos(datos);
            setError('');
        } catch (err) {
            setError(err.message || 'Error al cargar el inventario.');
        } finally {
            setCargando(false);
        }
    }


    useEffect(() => {
        let activo = true;

        async function obtenerProductos() {
            try {
                const respuesta = await fetch('/api/productos');

                if (!respuesta.ok) {
                    throw new Error('No se pudo consultar el inventario.');
                }

                const datos = await respuesta.json();

                if (activo) {
                    setProductos(datos);
                    setError('');
                }
            } catch (err) {
                if (activo) {
                    setError(err.message || 'Error al cargar el inventario.');
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        }

        obtenerProductos();

        return () => {
            activo = false;
        };
    }, []);

    const unidadesTotales = productos.reduce(
        (total, producto) => total + producto.stock,
        0
    );

    const productosStockBajo = productos.filter(
        (producto) => producto.stock < 10
    ).length;

    async function agregarProducto(event) {
        event.preventDefault();
        setError('');

        const nombreLimpio = nombre.trim();
        const cantidad = Number(stock);

        if (!nombreLimpio) {
            setError('Ingresa el nombre del producto.');
            return;
        }

        if (!Number.isInteger(cantidad) || cantidad < 0) {
            setError('El stock debe ser un número entero igual o mayor que cero.');
            return;
        }

        try {
            setGuardando(true);

            const respuesta = await fetch('/api/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombreLimpio,
                    categoria,
                    stock: cantidad,
                }),
            });

            const resultado = await respuesta.json().catch(() => ({}));

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || 'No se pudo guardar el producto.');
            }

            setNombre('');
            setCategoria('Abarrotes');
            setStock('1');

            await cargarProductos();
        } catch (err) {
            setError(err.message || 'Error al guardar el producto.');
        } finally {
            setGuardando(false);
        }
    }

    async function eliminarProducto(id) {
        if (!window.confirm('¿Deseas eliminar este producto del inventario?')) {
            return;
        }

        setError('');

        try {
            const respuesta = await fetch(`/api/productos/${id}`, {
                method: 'DELETE',
            });

            if (!respuesta.ok) {
                const resultado = await respuesta.json().catch(() => ({}));
                throw new Error(resultado.mensaje || 'No se pudo eliminar el producto.');
            }

            await cargarProductos();
        } catch (err) {
            setError(err.message || 'Error al eliminar el producto.');
        }
    }

    return (
        <main className="contenido">
            <section className="bienvenida">
                <p className="etiqueta">GESTIÓN DE INVENTARIO</p>
                <h1>Control de inventario</h1>
                <p>
                    Administra los productos y consulta las existencias del supermercado.
                </p>
            </section>

            <section className="resumen">
                <article className="tarjeta">
                    <span>Productos registrados</span>
                    <strong>{productos.length}</strong>
                </article>

                <article className="tarjeta">
                    <span>Unidades en inventario</span>
                    <strong>{unidadesTotales}</strong>
                </article>

                <article className="tarjeta">
                    <span>Productos con stock bajo</span>
                    <strong>{productosStockBajo}</strong>
                </article>
            </section>

            <section className="panel">
                <h2>Agregar producto</h2>

                <form className="formulario-producto" onSubmit={agregarProducto}>
                    <div className="campo">
                        <label htmlFor="nombre">Nombre del producto</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. Azúcar"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                            maxLength={80}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="categoria">Categoría</label>
                        <select
                            id="categoria"
                            value={categoria}
                            onChange={(event) => setCategoria(event.target.value)}
                        >
                            <option>Abarrotes</option>
                            <option>Lácteos</option>
                            <option>Panadería</option>
                            <option>Frutas y verduras</option>
                            <option>Bebidas</option>
                            <option>Limpieza</option>
                            <option>Congelados</option>
                            <option>Otros</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label htmlFor="stock">Stock inicial</label>
                        <input
                            id="stock"
                            type="number"
                            min="0"
                            step="1"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="boton-agregar"
                        type="submit"
                        disabled={guardando}
                    >
                        {guardando ? 'Guardando...' : '+ Agregar producto'}
                    </button>
                </form>

                {error && (
                    <p className="mensaje-error" role="alert">
                        {error}
                    </p>
                )}
            </section>

            <section className="panel">
                <h2>Inventario de productos</h2>

                {cargando ? (
                    <p>Cargando inventario...</p>
                ) : (
                    <div className="tabla-contenedor">
                        <table>
                            <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Stock</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                      <span
                          className={
                              producto.stock < 10
                                  ? 'estado bajo'
                                  : 'estado normal'
                          }
                      >
                        {producto.stock < 10 ? 'Stock bajo' : 'Disponible'}
                      </span>
                                    </td>
                                    <td>
                                        <button
                                            className="boton-eliminar"
                                            type="button"
                                            onClick={() => eliminarProducto(producto.id)}
                                            aria-label={`Eliminar ${producto.nombre}`}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {productos.length === 0 && (
                                <tr>
                                    <td colSpan="5">No hay productos registrados.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Home;
