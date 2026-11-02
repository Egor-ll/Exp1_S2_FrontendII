
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InventarioProvider } from './context/InventarioProvider.jsx';

import App from './App.jsx';


import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <InventarioProvider>
                <App />
            </InventarioProvider>
        </BrowserRouter>
    </StrictMode>
);
