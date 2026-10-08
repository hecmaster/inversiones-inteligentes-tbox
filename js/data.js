// Banco Teórico-Procedimental - Microsoft Word 365
// Distribución equilibrada de respuestas correctas (A, B, C, D)
const bancoTeorico = {
    1: {
        titulo: "1. Formato y Estilos de Texto (10 Preguntas)",
        descripcion: "Evalúa conceptos y la secuencia de pasos correcta para aplicar formatos, estilos, listas, efectos de texto y reemplazos.",
        preguntas: [
            {
                id: "q1_1",
                tema: "Borrar formato",
                pregunta: "Deseas quitar todos los formatos personalizados aplicados al texto '¿Qué es una inversión?' y dejarlo en el formato predeterminado. ¿Cuál es el procedimiento correcto?",
                opciones: [
                    "A) Seleccionar el texto -> Presionar la tecla Suprimir -> Pestaña Edición -> Deshacer.",
                    "B) Seleccionar el texto -> Pestaña Insertar -> Eliminar formato.",
                    "C) Seleccionar el texto -> Pestaña Inicio -> Grupo Fuente -> Clic en el icono 'Borrar todo el formato'.",
                    "D) Seleccionar el texto -> Clic derecho -> Cambiar a letra mayúscula."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Correcto! En la pestaña Inicio (Grupo Fuente) se encuentra la herramienta 'Borrar todo el formato' (icono de borrador junto a la letra A)."
            },
            {
                id: "q1_2",
                tema: "Emplear estilos de texto",
                pregunta: "¿Cuál es el procedimiento exacto para aplicar el estilo 'Título 1' al encabezado 'Importancia de la inversión'?",
                opciones: [
                    "A) Pestaña Insertar -> Galería de Estilos -> Elegir Título 1.",
                    "B) Clic derecho en la página -> Formato de párrafo -> Estilo Título 1.",
                    "C) Pestaña Disposición -> Estilos visuales -> Título 1.",
                    "D) Seleccionar el texto -> Pestaña Inicio -> Grupo Estilos -> Hacer clic en 'Título 1'."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Muy bien! Los estilos rápidos se aplican seleccionando el texto e ingresando a la galería del grupo 'Estilos' en la pestaña Inicio."
            },
            {
                id: "q1_3",
                tema: "Reemplazar texto",
                pregunta: "Se te pide cambiar todas las ocurrencias del término 'plazo' por 'tiempo' en todo el documento. ¿Qué secuencia debes seguir en Word 365?",
                opciones: [
                    "A) Pestaña Inicio -> Grupo Edición -> Clic en 'Reemplazar' -> Escribir 'plazo' en 'Buscar' y 'tiempo' en 'Reemplazar con' -> Clic en 'Reemplazar todos'.",
                    "B) Presionar Ctrl + B -> Buscar 'plazo' -> Borrar una por una manualmente.",
                    "C) Pestaña Revisar -> Ortografía y gramática -> Reemplazar sinónimo.",
                    "D) Pestaña Vista -> Panel de Navegación -> Reemplazar términos."
                ],
                correcta: 0, // Respuesta A
                retroalimentacion: "¡Excelente! La herramienta Reemplazar (disponible en Inicio > Grupo Edición o mediante el atajo Ctrl + L en español) automatiza la sustitución instantánea en todo el documento."
            },
            {
                id: "q1_4",
                tema: "Aplicar formato al texto",
                pregunta: "¿Cómo aplicas formato de negrita y cambio de color azul a la frase 'Crecimiento del capital'?",
                opciones: [
                    "A) Pestaña Disposición -> Color de fuente -> Negrita.",
                    "B) Clic derecho -> Insertar formato -> Azul.",
                    "C) Seleccionar la frase -> Pestaña Inicio -> Clic en 'N' (Negrita) y en la flecha de 'Color de fuente' elegir azul.",
                    "D) Pestaña Diseño -> Formato del documento -> Azul."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Correcto! Los comandos básicos de fuente (Negrita, Cursiva, Color) están ubicados en el grupo Fuente de la pestaña Inicio."
            },
            {
                id: "q1_5",
                tema: "Usar efectos de texto",
                pregunta: "Para darle un acabado con sombra visual al título principal, ¿cuál es la ruta correcta?",
                opciones: [
                    "A) Pestaña Insertar -> Efectos visuales -> Sombra.",
                    "B) Seleccionar el texto -> Pestaña Inicio -> Grupo Fuente -> Botón 'Efectos de texto y tipografía' -> Sombra.",
                    "C) Pestaña Vista -> Renderizado de texto -> Sombra.",
                    "D) Clic derecho -> Propiedades de la página -> Sombra de texto."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Así es! En 'Efectos de texto y tipografía' dentro de la pestaña Inicio puedes aplicar contornos, sombras, reflejos e iluminados."
            },
            {
                id: "q1_6",
                tema: "Trabajar con listas",
                pregunta: "Deseas convertir los puntos 1 a 5 de 'Primeros pasos para invertir' en una lista numerada formal. ¿Cuál es el procedimiento?",
                opciones: [
                    "A) Escribir los números a mano separando por comas.",
                    "B) Pestaña Insertar -> Lista de números -> Elegir formato.",
                    "C) Pestaña Referencias -> Insertar lista numerada.",
                    "D) Seleccionar los párrafos -> Pestaña Inicio -> Grupo Párrafo -> Clic en el icono 'Numeración'."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Correcto! El grupo Párrafo en la pestaña Inicio contiene las opciones para Viñetas, Numeración y Listas multinivel."
            },
            {
                id: "q1_7",
                tema: "Trabajar con listas",
                pregunta: "¿Cómo cambias el tipo de viñeta de los párrafos en '¿Qué es una inversión?' de un punto sólido a un ícono personalizado o símbolo?",
                opciones: [
                    "A) Seleccionar la lista -> Pestaña Inicio -> Flecha junto al botón 'Viñetas' -> 'Definir nueva viñeta...' -> Símbolo o Imagen.",
                    "B) Eliminar la lista y volver a escribirla manualmente.",
                    "C) Pestaña Disposición -> Cambiar icono de viñeta.",
                    "D) Clic derecho -> Viñetas rápidas -> Convertir en imagen."
                ],
                correcta: 0, // A
                retroalimentacion: "¡Muy bien! El menú desplegable de Viñetas permite seleccionar modelos existentes o definir nuevas viñetas con símbolos/imágenes."
            },
            {
                id: "q1_8",
                tema: "Aplicar formato al texto",
                pregunta: "Necesitas cambiar todo el texto del título 'CONSEJOS PRÁCTICOS PARA INVERSIONISTAS' a Tipo Oración. ¿Qué opción debes ejecutar?",
                opciones: [
                    "A) Borrar el texto y volverlo a escribir.",
                    "B) Pestaña Revisar -> Corregir mayúsculas.",
                    "C) Seleccionar el texto -> Pestaña Inicio -> Grupo Fuente -> Botón 'Cambiar mayúsculas y minúsculas' -> Seleccionar 'Tipo oración'.",
                    "D) Presionar Ctrl + Alt + M."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Excelente! La herramienta 'Cambiar mayúsculas y minúsculas' (Aa) modifica al instante la capitalización del texto sin reescribir."
            },
            {
                id: "q1_9",
                tema: "Emplear estilos de texto",
                pregunta: "Si modificas las propiedades de fuente del estilo 'Normal' en un documento, ¿qué ocurre con los párrafos que utilizan dicho estilo?",
                opciones: [
                    "A) Se eliminan del documento.",
                    "B) Se mantienen sin cambios hasta reiniciar Word.",
                    "C) Cambian únicamente si el usuario los vuelve a seleccionar.",
                    "D) Se actualizan automáticamente adoptando el nuevo formato."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Así es! Los estilos vinculan el formato centralizadamente; cualquier modificación en el estilo actualiza de inmediato el texto asociado."
            },
            {
                id: "q1_10",
                tema: "Reemplazar texto",
                pregunta: "¿Es posible reemplazar no solo palabras sino también características de formato (ej. texto en negrita por texto azul) mediante la ventana Buscar y reemplazar?",
                opciones: [
                    "A) No, Buscar y reemplazar solo trabaja con texto plano.",
                    "B) Sí, desplegando el botón 'Más >>' dentro del cuadro de diálogo -> Menú 'Formato'.",
                    "C) Sí, pero requiere instalar una extensión externa.",
                    "D) Solo si el archivo se exporta en formato HTML."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Correcto! En la opción extendida 'Más >>' de Buscar y Reemplazar se pueden definir criterios avanzados de formato (fuente, párrafos, estilos)."
            }
        ]
    },
    2: {
        titulo: "2. Configuración de Página y Maquetación (10 Preguntas)",
        descripcion: "Preguntas sobre tamaño de papel, orientación, márgenes, distribución en columnas, diseño del documento y marcas de agua.",
        preguntas: [
            {
                id: "q2_1",
                tema: "Márgenes, columnas y color de página",
                pregunta: "Para organizar un texto en 2 columnas verticales con una línea divisoria entre ambas en Word 365, ¿cuál es el procedimiento?",
                opciones: [
                    "A) Pestaña Insertar -> 2 Columnas -> Dibujar línea.",
                    "B) Pestaña Vista -> Vista previa en columnas.",
                    "C) Seleccionar el texto -> Pestaña Disposición -> Grupo Configurar página -> 'Columnas' -> 'Más columnas...' -> Seleccionar 'Dos' y marcar 'Línea entre columnas'.",
                    "D) Clic derecho -> Configurar página -> 2 bloques."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Correcto! La pestaña Disposición > Columnas > Más columnas abre las opciones avanzadas para definir el ancho y la línea divisoria."
            },
            {
                id: "q2_2",
                tema: "Ajuste de tamaño de papel",
                pregunta: "Se requiere ajustar el tamaño de la hoja a 'Carta' (Letter) en lugar de 'A4'. ¿Qué pasos debes realizar?",
                opciones: [
                    "A) Pestaña Inicio -> Tamaño de hoja -> Carta.",
                    "B) Pestaña Disposición -> Grupo Configurar página -> Clic en 'Tamaño' -> Seleccionar 'Carta'.",
                    "C) Pestaña Archivo -> Imprimir -> Reducir tamaño.",
                    "D) Pestaña Diseño -> Fondo de página -> Tamaño."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Muy bien! Las dimensiones y formato físico de la página (Márgenes, Orientación y Tamaño) se gestionan desde la pestaña Disposición."
            },
            {
                id: "q2_3",
                tema: "Cambiar la orientación de la página",
                pregunta: "Deseas cambiar la orientación únicamente de la segunda página a 'Horizontal' manteniendo la primera página en 'Vertical'. ¿Cómo se realiza correctamente?",
                opciones: [
                    "A) No se puede; la orientación se aplica obligatoriamente a todo el documento.",
                    "B) Girar la página con la herramienta Rotar en la pestaña Vista.",
                    "C) Guardar la segunda página como un documento separado.",
                    "D) Situar el cursor en la página 2 -> Pestaña Disposición -> Abrir el cuadro emergente 'Configurar página' -> Elegir 'Horizontal' -> Seleccionar Aplicar a: 'De aquí en adelante' (o insertar Salto de sección)."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Excelente! La creación de secciones o la opción 'De aquí en adelante' permite cambiar configuraciones de página en puntos específicos."
            },
            {
                id: "q2_4",
                tema: "Marca de agua y número de página",
                pregunta: "Para insertar una marca de agua con el texto 'BORRADOR' en el fondo de todas las hojas, ¿cuál es la ruta oficial en Word 365?",
                opciones: [
                    "A) Pestaña Diseño -> Grupo Fondo de página -> Clic en 'Marca de agua' -> Seleccionar la plantilla 'BORRADOR'.",
                    "B) Pestaña Insertar -> Fondo -> Marca de agua.",
                    "C) Pestaña Vista -> Marcas de agua.",
                    "D) Pestaña Disposición -> Marca de agua de fondo."
                ],
                correcta: 0, // A
                retroalimentacion: "¡Así es! Los elementos de personalización estética global de la página (Marca de agua, Color de página, Bordes) están en la pestaña 'Diseño'."
            },
            {
                id: "q2_5",
                tema: "Márgenes, columnas y color de página",
                pregunta: "¿Cómo aplicas una configuración de márgenes de tipo 'Estrecho' (1.27 cm en cada borde) a todo el documento?",
                opciones: [
                    "A) Pestaña Inicio -> Párrafo -> Sangría estrecha.",
                    "B) Pestaña Diseño -> Márgenes.",
                    "C) Pestaña Disposición -> Grupo Configurar página -> Clic en 'Márgenes' -> Seleccionar 'Estrecho'.",
                    "D) Arrastrar manualmente la regla graduada."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Correcto! En Disposición > Márgenes se accede a los esquemas predefinidos como Normal, Estrecho, Moderado, Ancho y Reflejado."
            },
            {
                id: "q2_6",
                tema: "Definir el diseño del documento",
                pregunta: "Para cambiar de manera global la combinación de colores, tipos de fuente y efectos visuales de todo el documento con un solo clic, ¿qué herramienta utilizas?",
                opciones: [
                    "A) Pestaña Inicio -> Reemplazar formato.",
                    "B) Pestaña Diseño -> Grupo Formato del documento -> Clic en 'Temas'.",
                    "C) Pestaña Archivo -> Opciones -> Personalizar.",
                    "D) Pestaña Vista -> Modo de diseño."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Perfecto! Los 'Temas' en la pestaña Diseño unifican la paleta tipográfica y cromática de todos los elementos del documento."
            },
            {
                id: "q2_7",
                tema: "Márgenes, columnas y color de página",
                pregunta: "Deseas cambiar el fondo blanco de las páginas por un tono azul claro para lectura digital. ¿En qué pestaña se ubica esta herramienta?",
                opciones: [
                    "A) Pestaña Disposición -> Color de fondo.",
                    "B) Pestaña Vista -> Tono de lectura.",
                    "C) Pestaña Insertar -> Relleno de hoja.",
                    "D) Pestaña Diseño -> Grupo Fondo de página -> 'Color de página'."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Muy bien! 'Color de página' pertenece al grupo Fondo de página dentro de la pestaña Diseño."
            },
            {
                id: "q2_8",
                tema: "Marca de agua y número de página",
                pregunta: "Para incluir el número de página en el centro de la parte inferior de todas las hojas, ¿cuál es el procedimiento?",
                opciones: [
                    "A) Pestaña Disposición -> Numerar páginas.",
                    "B) Pestaña Insertar -> Grupo Encabezado y pie de página -> Clic en 'Número de página' -> 'Final de página' -> Seleccionar 'Número sin formato 2' (Centrado).",
                    "C) Escribir el número manualmente al final de cada página.",
                    "D) Pestaña Vista -> Agregar números de hoja."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Correcto! La inserción automática y dinámica de 'Número de página' se realiza desde la pestaña Insertar."
            },
            {
                id: "q2_9",
                tema: "Cambiar la orientación de la página",
                pregunta: "¿Cuál es la ventaja principal de cambiar la orientación de un documento a 'Horizontal' al trabajar con tablas de muchos datos?",
                opciones: [
                    "A) El texto cambia a minúsculas automáticamente.",
                    "B) Amplía el ancho del lienzo imprimible, evitando que las columnas de la tabla se amontonen o se corten en las márgenes.",
                    "C) Convierte el archivo automáticamente en una hoja de cálculo de Excel.",
                    "D) Bloquea el documento contra modificaciones."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Exacto! El formato horizontal incrementa la amplitud horizontal del documento, siendo ideal para tablas ancha o esquemas."
            },
            {
                id: "q2_10",
                tema: "Definir el diseño del documento",
                pregunta: "Para ajustar la separación de líneas y párrafos de forma uniforme en todo el documento (ej. Compacto, Moderado, Abierto), ¿qué opción usas?",
                opciones: [
                    "A) Pestaña Inicio -> Espacio entre caracteres.",
                    "B) Pestaña Revisar -> Párrafos.",
                    "C) Pestaña Diseño -> Grupo Formato del documento -> 'Espaciado entre párrafos'.",
                    "D) Presionar Enter dos veces al final de cada línea."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Así es! En la pestaña Diseño > Espaciado entre párrafos se ajusta el comportamiento del interlineado de forma estandarizada a nivel global."
            }
        ]
    },
    3: {
        titulo: "3. Tablas e Ilustraciones (10 Preguntas)",
        descripcion: "Cuestionario procedimental sobre creación y gestión de tablas, filas/columnas, imágenes, íconos, formas y cuadros de texto.",
        preguntas: [
            {
                id: "q3_1",
                tema: "Trabajar con tablas / Insertar filas y columnas",
                pregunta: "Necesitas agregar una nueva columna a la derecha en una tabla existente. ¿Cuál es el procedimiento en Word 365?",
                opciones: [
                    "A) Pestaña Inicio -> Agregar columna.",
                    "B) Presionar Ctrl + C dentro de una celda.",
                    "C) Pestaña Vista -> Insertar campo.",
                    "D) Clic derecho en la celda -> 'Insertar' -> 'Insertar columnas a la derecha' (o usar el control '+' que aparece en el borde superior de la tabla)."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Correcto! El menú contextual, el control flotante '+' o la pestaña contextual 'Herramientas de tabla / Disposición' permiten agregar elementos a la tabla."
            },
            {
                id: "q3_2",
                tema: "Insertar y edición de imágenes",
                pregunta: "Has insertado una imagen pero no puedes moverla libremente entre los párrafos. ¿Qué parámetro debes modificar?",
                opciones: [
                    "A) La resolución del archivo de imagen.",
                    "B) Hacer clic en el icono flotante 'Opciones de diseño' junto a la imagen -> Cambiar 'En línea con el texto' por un ajuste como 'Cuadrado' o 'Estrecho'.",
                    "C) Exportar la imagen como icono.",
                    "D) Pegar la imagen dentro de una nota al pie."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Muy bien! Las opciones de 'Ajuste de texto' desligan la imagen de la fijación por renglón y permiten desplazarla libremente."
            },
            {
                id: "q3_3",
                tema: "Trabajar con cuadros de texto",
                pregunta: "Deseas colocar una frase destacada dentro de un contenedor independiente que se pueda posicionar libremente en el documento. ¿Qué herramienta utilizas?",
                opciones: [
                    "A) Un salto de sección de página.",
                    "B) Una nota al pie de página.",
                    "C) Pestaña Insertar -> Grupo Texto -> Clic en 'Cuadro de texto'.",
                    "D) Un comentario al margen."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Excelente! Los cuadros de texto son objetos de dibujo diseñados para contener texto con posición y formato personalizados."
            },
            {
                id: "q3_4",
                tema: "Insertar íconos y formas",
                pregunta: "Para insertar un ícono vectorial estilizado (por ejemplo, de finanzas o negocios) en Word 365, ¿cuál es la ruta directa?",
                opciones: [
                    "A) Pestaña Insertar -> Grupo Ilustraciones -> Clic en 'Íconos'.",
                    "B) Pestaña Inicio -> Insertar vector.",
                    "C) Pestaña Vista -> Galería web.",
                    "D) Copiar un carácter desde el mapa de caracteres del sistema."
                ],
                correcta: 0, // A
                retroalimentacion: "¡Así es! Word 365 incluye la biblioteca 'Íconos' en la pestaña Insertar (Grupo Ilustraciones) con cientos de gráficos escalables."
            },
            {
                id: "q3_5",
                tema: "Trabajar con tablas",
                pregunta: "Deseas unir varias celdas seleccionadas de una fila para convertirlas en un único encabezado horizontal. ¿Qué opción ejecutas?",
                opciones: [
                    "A) Borrar las divisiones con la tecla Suprimir.",
                    "B) Seleccionar las celdas -> Pestaña contextual 'Herramientas de tabla / Disposición' -> Grupo Combinar -> 'Combinar celdas'.",
                    "C) Pestaña Inicio -> Agrupar celdas.",
                    "D) Copiar el texto en la primera celda."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Correcto! El comando 'Combinar celdas' integra un grupo de celdas adyacentes seleccionadas en una sola celda de mayor tamaño."
            },
            {
                id: "q3_6",
                tema: "Insertar y edición de imágenes",
                pregunta: "¿Cómo aplícas un estilo gráfico (borde redondeado, sombra o marco) a una imagen seleccionada?",
                opciones: [
                    "A) Pestaña Diseño -> Bordes de imagen.",
                    "B) Clic derecho -> Convertir a SmartArt.",
                    "C) Pestaña Disposición -> Sombra de objeto.",
                    "D) Seleccionar la imagen -> Pestaña contextual 'Formato de imagen' -> Galería de 'Estilos de imagen'."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Perfecto! Al seleccionar una imagen se activa la pestaña contextual 'Formato de imagen' que contiene la biblioteca de estilos prémium."
            },
            {
                id: "q3_7",
                tema: "Insertar íconos y formas",
                pregunta: "Para insertar una forma de rectángulo y enviarla detrás del texto en el lienzo, ¿cuál es el procedimiento?",
                opciones: [
                    "A) Pestaña Insertar -> Grupo Ilustraciones -> 'Formas' -> Elegir Rectángulo -> Dibujarlo -> Pestaña contextual 'Formato de forma' -> Clic en 'Enviar atrás' / 'Detrás del texto'.",
                    "B) Pestaña Inicio -> Relleno de párrafo.",
                    "C) Pestaña Vista -> Dibujar bloque de fondo.",
                    "D) Pestaña Disposición -> Color de cuadro."
                ],
                correcta: 0, // A
                retroalimentacion: "¡Así es! Las 'Formas' se insertan desde la pestaña Insertar y su nivel de superposición se administra desde su pestaña contextual de Formato."
            },
            {
                id: "q3_8",
                tema: "Insertar un símbolo",
                pregunta: "Requieres colocar el símbolo de marca registrada (®) o letras de alfabetos especiales. ¿Dónde se encuentra esta función?",
                opciones: [
                    "A) Pestaña Inicio -> Grupo Fuente -> Símbolos.",
                    "B) Pestaña Revisar -> Teclado de símbolos.",
                    "C) Pestaña Insertar -> Grupo Símbolos -> Clic en 'Símbolo' -> 'Más símbolos...'.",
                    "D) Pestaña Disposición -> Caracteres especiales."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Muy bien! El comando 'Símbolo' en la pestaña Insertar permite acceder al mapa de caracteres y símbolos tipográficos avanzadas."
            },
            {
                id: "q3_9",
                tema: "Trabajar con tablas",
                pregunta: "Para aplicar un sombreado intercalado automático entre las filas de una tabla, ¿qué opción debes usar?",
                opciones: [
                    "A) Pintar cada celda una por una con la herramienta Sombreo.",
                    "B) Seleccionar la tabla -> Pestaña contextual 'Diseño de tabla' -> Marcar la casilla 'Filas con bandas' y seleccionar un estilo de la galería.",
                    "C) Pestaña Vista -> Sombras de tabla.",
                    "D) Pestaña Disposición -> Alternar colores."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Excelente! La opción 'Filas con bandas' en la pestaña contextual 'Diseño de tabla' aplica una alternancia de color que mejora la lectura."
            },
            {
                id: "q3_10",
                tema: "Insertar y edición de imágenes",
                pregunta: "¿Qué herramienta utilizas para recortar los extremos sobrantes o enfocar solo una sección de una fotografía?",
                opciones: [
                    "A) Borrar los bordes presionando la tecla Retroceso.",
                    "B) Seleccionar la imagen -> Pestaña contextual 'Formato de imagen' -> Botón 'Recortar' -> Mover los controladores negros de recortes.",
                    "C) Pestaña Disposición -> Reducir dimensiones.",
                    "D) Modificar el zoom de pantalla."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Correcto! La herramienta 'Recortar' oculta o elimina áreas periféricas indeseadas del marco visual de una imagen."
            }
        ]
    },
    4: {
        titulo: "4. Referencias y Revisión (10 Preguntas)",
        descripcion: "Validación procedimental sobre encabezados, pies de página, notas al pie, comentarios, metadatos y exportación a PDF.",
        preguntas: [
            {
                id: "q4_1",
                tema: "Insertar una nota al pie",
                pregunta: "Se te pide agregar una nota aclaratoria sobre un término al final de la página actual. ¿Cuál es el procedimiento exacto?",
                opciones: [
                    "A) Escribir el texto manualmente al borde inferior del lienzo.",
                    "B) Pestaña Insertar -> Pie de página -> Nota aclaratoria.",
                    "C) Colocar el cursor junto a la palabra -> Pestaña Referencias -> Grupo Notas al pie -> Clic en 'Insertar nota al pie'.",
                    "D) Pestaña Revisar -> Agregar nota."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Correcto! Las notas al pie automatizadas se gestionan formalmente en la pestaña 'Referencias' (Grupo Notas al pie)."
            },
            {
                id: "q4_2",
                tema: "Encabezado y pie de página",
                pregunta: "Para colocar el título del trabajo en el borde superior de todas las hojas de forma automatizada, ¿qué secuencia utilizas?",
                opciones: [
                    "A) Escribir el título en la primera línea de cada hoja.",
                    "B) Pestaña Insertar -> Grupo Encabezado y pie de página -> Clic en 'Encabezado' -> Seleccionar un formato.",
                    "C) Pestaña Disposición -> Texto repetitivo.",
                    "D) Pestaña Vista -> Título superior."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Muy bien! Los encabezados proyectan contenido recurrente en el margen superior de todas las páginas vinculadas a la sección."
            },
            {
                id: "q4_3",
                tema: "Insertar y eliminar comentarios",
                pregunta: "Un revisor desea dejar una nota u observación en el margen lateral sin modificar la redacción del documento. ¿Cómo lo hace?",
                opciones: [
                    "A) Escribir en texto rojo entre corchetes.",
                    "B) Pestaña Insertar -> Objeto flotante.",
                    "C) Pestaña Disposición -> Nota marginal.",
                    "D) Seleccionar el texto -> Pestaña Revisar -> Grupo Comentarios -> Clic en 'Nuevo comentario'."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Así es! Los comentarios de la pestaña 'Revisar' generan tarjetas laterales fijadas a fragmentos de texto para revisión colaborativa."
            },
            {
                id: "q4_4",
                tema: "Modificar las propiedades del documento",
                pregunta: "¿Dónde se edita el 'Autor', 'Título' y 'Etiquetas' dentro de las propiedades internas de un archivo Word 365?",
                opciones: [
                    "A) Pestaña Inicio -> Propiedades de texto.",
                    "B) Menú Archivo -> Sección 'Información' -> Columna derecha panel 'Propiedades'.",
                    "C) Pestaña Vista -> Metadatos de usuario.",
                    "D) Pestaña Diseño -> Autor del documento."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Excelente! Los metadatos identificadores del documento se configuran en el backend de la aplicación: Archivo > Información."
            },
            {
                id: "q4_5",
                tema: "Guardar documento en PDF",
                pregunta: "Para generar una copia final en formato PDF en Word 365, ¿qué menú oficial se debe emplear?",
                opciones: [
                    "A) Menú Archivo -> 'Guardar como' -> Seleccionar tipo 'PDF (*.pdf)' (o Archivo -> 'Exportar' -> Crear documento PDF/XPS).",
                    "B) Cambiar manualmente la extensión del archivo .docx por .pdf en el explorador de Windows.",
                    "C) Pestaña Vista -> Guardar vista previa PDF.",
                    "D) Pestaña Revisar -> Convertir formato."
                ],
                correcta: 0, // A
                retroalimentacion: "¡Perfecto! La conversión nativa a PDF se realiza desde la sección Archivo > Guardar como o Exportar."
            },
            {
                id: "q4_6",
                tema: "Insertar y eliminar comentarios",
                pregunta: "¿Cómo eliminas definitivamente una tarjeta de comentario que ya fue atendida?",
                opciones: [
                    "A) Borrar el texto del documento que estaba marcado.",
                    "B) Minimizar la pantalla.",
                    "C) Hacer clic derecho en el comentario -> 'Eliminar comentario' (o seleccionarlo e ir a Pestaña Revisar -> Eliminar).",
                    "D) Presionar Ctrl + Z."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Correcto! Los comentarios se borran explícitamente desde su menú contextual o utilizando el botón 'Eliminar' de la pestaña Revisar."
            },
            {
                id: "q4_7",
                tema: "Encabezado y pie de página",
                pregunta: "Si necesitas que la portada del trabajo NO contenga el mismo encabezado que el resto del documento, ¿qué casilla debes activar?",
                opciones: [
                    "A) Hacer doble clic en el encabezado -> Pestaña contextual 'Encabezado y pie de página' -> Marcar la casilla 'Primera página diferente'.",
                    "B) Pestaña Inicio -> Ocultar en portada.",
                    "C) Pestaña Disposición -> Eliminar de página 1.",
                    "D) Esta función no existe en Microsoft Word."
                ],
                correcta: 0, // A
                retroalimentacion: "¡Muy bien! 'Primera página diferente' desvincula el encabezado y pie de la primera hoja para permitir portadas limpias."
            },
            {
                id: "q4_8",
                tema: "Insertar una nota al pie",
                pregunta: "¿De qué forma se representa visualmente una 'Nota al pie' en el cuerpo del texto?",
                opciones: [
                    "A) Como una marca de agua gigante sobre la hoja.",
                    "B) Como un título destacado en negrita.",
                    "C) Como un número o símbolo en formato superíndice pequeño junto al texto, enlazado al margen inferior de la misma página.",
                    "D) Como un cuadro flotante con bordes punteados."
                ],
                correcta: 2, // C
                retroalimentacion: "¡Exacto! Las notas al pie colocan un indicador de superíndice junto al término y el contenido explicativo al pie de esa misma página."
            },
            {
                id: "q4_9",
                tema: "Modificar las propiedades del documento",
                pregunta: "¿Cuál es el propósito principal de completar las propiedades de metadatos (Autor, Asunto) antes de enviar una tarea o informe académico?",
                opciones: [
                    "A) Reducir el peso del archivo en kilobytes.",
                    "B) Garantizar la identificación formal de la autoría del archivo y facilitar la organización en sistemas de gestión documental.",
                    "C) Activar la corrección gramatical automática.",
                    "D) Cambiar el color de fondo predeterminado."
                ],
                correcta: 1, // B
                retroalimentacion: "¡Excelente! Los metadatos de autoría certifican la propiedad digital del archivo e identifican formalmente la entrega académica."
            },
            {
                id: "q4_10",
                tema: "Guardar documento en PDF",
                pregunta: "Al exportar un trabajo a formato PDF, ¿qué ventaja clave se obtiene respecto al diseño y maquetación del archivo original?",
                opciones: [
                    "A) Se eliminan automáticamente las imágenes para ahorrar espacio.",
                    "B) Se convierte todo el documento a texto sin formato.",
                    "C) Se desordenan las tablas para adaptarse al celular.",
                    "D) Conserva de manera exacta las fuentes, imágenes y el diseño visual sin importar la computadora o dispositivo donde se abra."
                ],
                correcta: 3, // D
                retroalimentacion: "¡Así es! El estándar PDF garantiza que la presentación e integridad visual del documento sean idénticas en cualquier plataforma o sistema."
            }
        ]
    }
};