
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const archivoProductos = path.join(
    __dirname,
    'data',
    'productos.json'
);

app.use(express.json());

async function leerProductos() {
    const contenido = await fs.readFile(archivoProductos, 'utf8');
    return JSON.parse(contenido);
}

async function guardarProductos(productos) {
    await fs.writeFile(
        archivoProductos,
        JSON.stringify(productos, null, 2),
        'utf8'
    );
}

app.get('/api/productos', async (req, res) => {
    try {
        res.json(await leerProductos());
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'No se pudo leer el inventario.' });
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const { nombre, categoria, stock } = req.body;

        if (
            typeof nombre !== 'string' ||
            !nombre.trim() ||
            typeof categoria !== 'string' ||
            !categoria.trim() ||
            !Number.isInteger(stock) ||
            stock < 0
        ) {
            return res.status(400).json({
                mensaje: 'Los datos del producto no son válidos.'
            });
        }

        const productos = await leerProductos();

        const duplicado = productos.some(
            (producto) =>
                producto.nombre.toLowerCase() === nombre.trim().toLowerCase()
        );

        if (duplicado) {
            return res.status(409).json({
                mensaje: 'Ya existe un producto con ese nombre.'
            });
        }

        const nuevoProducto = {
            id: productos.reduce(
                (maximo, producto) => Math.max(maximo, producto.id),
                0
            ) + 1,
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            stock
        };

        productos.push(nuevoProducto);
        await guardarProductos(productos);

        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'No se pudo guardar el producto.'
        });
    }
});

app.delete('/api/productos/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productos = await leerProductos();
        const actualizados = productos.filter(
            (producto) => producto.id !== id
        );

        if (actualizados.length === productos.length) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado.'
            });
        }

        await guardarProductos(actualizados);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'No se pudo eliminar el producto.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
});
