import { useEffect, useState } from 'react';
import { InventarioContext } from './InventarioContext.js';

const API_URL = '/api/productos';

export function InventarioProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    // Consultar inventario
    async function cargarProductos() {
        try {
            setCargando(true);
            setError('');

            const respuesta = await fetch(API_URL);

            if (!respuesta.ok) {
                throw new Error('No se pudo obtener el inventario.');
            }

            const datos = await respuesta.json();
            setProductos(datos);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        let activo = true;

        fetch(API_URL)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo obtener el inventario.');
                }

                return respuesta.json();
            })
            .then(datos => {
                if (activo) {
                    setProductos(datos);
                }
            })
            .catch(error => {
                if (activo) {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (activo) {
                    setCargando(false);
                }
            });

        return () => {
            activo = false;
        };
    }, []);

    // Registrar artículo
    async function agregarProducto(producto) {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.mensaje || 'No se pudo registrar el artículo.'
            );
        }

        setProductos(actuales => [...actuales, datos]);

        return datos;
    }

    // Descontar unidades del stock
    async function descontarStock(id, cantidad) {
        const respuesta = await fetch(
            `${API_URL}/${id}/descontar`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad }),
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                datos.mensaje || 'No se pudo descontar el stock.'
            );
        }

        setProductos(actuales =>
            actuales.map(producto =>
                producto.id === id ? datos.producto : producto
            )
        );

        return datos.producto;
    }

    // Eliminar artículo completo
    async function eliminarProducto(id) {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!respuesta.ok) {
            const datos = await respuesta.json();

            throw new Error(
                datos.mensaje || 'No se pudo eliminar el artículo.'
            );
        }

        setProductos(actuales =>
            actuales.filter(producto => producto.id !== id)
        );
    }

    return (
        <InventarioContext.Provider
            value={{
                productos,
                cargando,
                error,
                agregarProducto,
                descontarStock,
                eliminarProducto,
                cargarProductos,
            }}
        >
            {children}
        </InventarioContext.Provider>
    );
}