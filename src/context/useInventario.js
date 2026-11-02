import { useContext } from 'react';
import { InventarioContext } from './InventarioContext.js';

export function useInventario() {
    const contexto = useContext(InventarioContext);

    if (!contexto) {
        throw new Error(
            'useInventario debe utilizarse dentro de InventarioProvider.'
        );
    }

    return contexto;
}