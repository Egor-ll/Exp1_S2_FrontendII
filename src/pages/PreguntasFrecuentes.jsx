
const preguntas = [
    {
        pregunta: '¿Cómo puedo consultar el inventario?',
        respuesta:
            'Ingresa a la sección Inventario desde el menú principal para revisar los productos registrados y sus existencias.',
    },
    {
        pregunta: '¿Qué significa stock bajo?',
        respuesta:
            'Indica que un producto tiene menos de 10 unidades registradas en el inventario.',
    },
    {
        pregunta: '¿Los datos se guardan permanentemente?',
        respuesta:
            'Sí. El servidor Express guarda los cambios en un archivo JSON, por lo que los productos registrados, eliminados y las modificaciones de stock se conservan.',
    },
    {
        pregunta: '¿Cómo puedo volver al inicio?',
        respuesta:
            'Selecciona Inicio en el menú de navegación principal para regresar al panel de inventario.',
    },
];

function PreguntasFrecuentes() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">

            <section className="mb-8 rounded-2xl bg-[#176b45] p-6 text-white shadow-lg sm:p-8">
                <p className="mb-3 text-xs font-extrabold tracking-[1.5px] text-[#b9e7ca]">
                    CENTRO DE AYUDA
                </p>

                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Preguntas frecuentes
                </h1>

                <p className="max-w-3xl leading-7 text-[#e0f0e5]">
                    Resolvemos algunas dudas sobre nuestro sistema de inventario.
                </p>
            </section>

            <section className="flex flex-col gap-5">
                {preguntas.map((item, indice) => (
                    <article
                        className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8"
                        key={indice}
                    >
                        <h2 className="mb-3 text-lg font-bold text-[#176b45]">
                            {item.pregunta}
                        </h2>

                        <p className="leading-7 text-[#64736a]">
                            {item.respuesta}
                        </p>
                    </article>
                ))}
            </section>

        </main>
    );
}

export default PreguntasFrecuentes;
