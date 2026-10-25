
const preguntas = [
    {
        pregunta: '¿Cómo puedo consultar el inventario?',
        respuesta:
            'Ingresa a la página Inicio para revisar los productos registrados y sus existencias.',
    },
    {
        pregunta: '¿Qué significa stock bajo?',
        respuesta:
            'Indica que un producto tiene menos de 10 unidades registradas en el inventario de ejemplo.',
    },
    {
        pregunta: '¿Los datos se guardan permanentemente?',
        respuesta:
            'No. Esta versión utiliza datos de ejemplo almacenados en el código.',
    },
    {
        pregunta: '¿Cómo puedo volver al inicio?',
        respuesta:
            'Selecciona Inicio en el menú inferior para regresar al panel de inventario.',
    },
];

function PreguntasFrecuentes() {
    return (
        <main className="contenido pagina-informativa">
            <p className="etiqueta">CENTRO DE AYUDA</p>
            <h1>Preguntas frecuentes</h1>
            <p>Resolvemos algunas dudas sobre nuestro sistema de inventario.</p>

            <section className="preguntas">
                {preguntas.map((item, indice) => (
                    <article className="panel pregunta" key={indice}>
                        <h2>{item.pregunta}</h2>
                        <p>{item.respuesta}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default PreguntasFrecuentes;
