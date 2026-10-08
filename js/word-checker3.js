function marcarTarea(checkbox) {
    const itemCard = checkbox.closest('.item-card');
    if (checkbox.checked) {
        itemCard.classList.add('completado');
    } else {
        itemCard.classList.remove('completado');
    }
}

function toggleAyuda(idAyuda) {
    const el = document.getElementById(idAyuda);
    if (el) {
        el.style.display = (el.style.display === "block") ? "none" : "block";
    }
}

async function analizarYCalificarDocx() {
    const input = document.getElementById('inputDocx');
    if (!input.files || input.files.length === 0) {
        alert("⚠️ Por favor, selecciona un archivo .docx para evaluar.");
        return;
    }

    const file = input.files[0];

    try {
        const zip = await JSZip.loadAsync(file);

        // Extracción de archivos XML necesarios
        const docXml = zip.file("word/document.xml") ? await zip.file("word/document.xml").async("text") : "";
        const stylesXml = zip.file("word/styles.xml") ? await zip.file("word/styles.xml").async("text") : "";
        const footnotesXml = zip.file("word/footnotes.xml") ? await zip.file("word/footnotes.xml").async("text") : "";
        const corePropsXml = zip.file("docProps/core.xml") ? await zip.file("docProps/core.xml").async("text") : "";
        const appPropsXml = zip.file("docProps/app.xml") ? await zip.file("docProps/app.xml").async("text") : "";
        const relsXml = zip.file("word/_rels/document.xml.rels") ? await zip.file("word/_rels/document.xml.rels").async("text") : "";

        // Lectura de Encabezados y Pies de página
        let headersXml = "";
        let footersXml = "";
        for (const filename of Object.keys(zip.files)) {
            if (filename.startsWith("word/header")) {
                headersXml += await zip.file(filename).async("text");
            } else if (filename.startsWith("word/footer")) {
                footersXml += await zip.file(filename).async("text");
            }
        }

        const mediaFiles = Object.keys(zip.files).filter(f => f.startsWith("word/media/"));

        ejecutarEvaluacionReto3(docXml, stylesXml, footnotesXml, corePropsXml, appPropsXml, headersXml, footersXml, relsXml, mediaFiles);

    } catch (err) {
        alert("Error al analizar la estructura ZIP/XML del archivo Word: " + err.message);
    }
}

function ejecutarEvaluacionReto3(docXml, stylesXml, footnotesXml, corePropsXml, appPropsXml, headersXml, footersXml, relsXml, mediaFiles) {
    const evaluaciones = [];

    // EXTRACCIÓN DEL NOMBRE DEL ESTUDIANTE (DESDE LA PROPIEDAD 'COMMENTS' O 'CREATOR')
    let nombreEstudiante = "No detectado";
    if (corePropsXml.length > 0) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(corePropsXml, "text/xml");
            const descriptionNode = xmlDoc.getElementsByTagName("dc:description")[0] || xmlDoc.getElementsByTagName("description")[0];
            const creatorNode = xmlDoc.getElementsByTagName("dc:creator")[0] || xmlDoc.getElementsByTagName("creator")[0];
            
            if (descriptionNode && descriptionNode.textContent.trim().length > 0) {
                nombreEstudiante = descriptionNode.textContent.trim();
            } else if (creatorNode && creatorNode.textContent.trim().length > 0) {
                nombreEstudiante = creatorNode.textContent.trim();
            }
        } catch (e) {
            const matchDesc = corePropsXml.match(/<dc:description[^>]*>(.*?)<\/dc:description>/i);
            if (matchDesc && matchDesc[1]) nombreEstudiante = matchDesc[1].trim();
        }
    }

    const elNombre = document.getElementById('nombreEstudiante');
    if (elNombre) elNombre.innerText = nombreEstudiante;

    const docLower = docXml.toLowerCase();
    const headersLower = headersXml.toLowerCase();
    const footersLower = footersXml.toLowerCase();
    const footnotesLower = footnotesXml.toLowerCase();
    const coreLower = corePropsXml.toLowerCase();

    // --------------------------------------------------------------------------
    // 1. ENCABEZADO 'CON BANDAS' CON TEXTO "INVERSIONES INTELIGENTES"
    // --------------------------------------------------------------------------
    const tieneTextoEncabezado = headersLower.includes("inversiones inteligentes") || docLower.includes("inversiones inteligentes");
    const tieneEstiloBandas = headersLower.includes("band") || headersXml.includes("Banded") || headersXml.includes("Con bandas") || headersXml.length > 0;
    const logro1 = tieneTextoEncabezado && tieneEstiloBandas;

    evaluaciones.push({
        id: 1,
        nombre: "Encabezado 'Con bandas' con el texto 'INVERSIONES INTELIGENTES'",
        pts: 10,
        logrado: logro1,
        feedback: logro1 
            ? "Encabezado 'Con bandas' y texto 'INVERSIONES INTELIGENTES' detectados correctamente." 
            : "0 pts: No se encontró el texto 'INVERSIONES INTELIGENTES' en el encabezado o el diseño 'Con bandas'."
    });

    // --------------------------------------------------------------------------
    // 2. NOTA AL PIE EN EL PRIMER PÁRRAFO
    // --------------------------------------------------------------------------
    const textoNotaBuscado = "rendimiento nominal y el rendimiento real";
    const tieneNotaPie = footnotesLower.includes(textoNotaBuscado) || docLower.includes(textoNotaBuscado);
    const logro2 = tieneNotaPie;

    evaluaciones.push({
        id: 2,
        nombre: "Nota al pie al final del primer párrafo con el texto requerido",
        pts: 10,
        logrado: logro2,
        feedback: logro2 
            ? "Nota al pie 'Es importante diferenciar entre el rendimiento nominal...' verificada correctamente." 
            : "0 pts: No se encontró la nota al pie con la explicación sobre el rendimiento nominal y real."
    });

    // --------------------------------------------------------------------------
    // 3. NUMERACIÓN DE PÁGINA 'CÍRCULO' EN LA PARTE INFERIOR
    // --------------------------------------------------------------------------
    const tieneCampoPagina = footersXml.includes("PAGE") || footersXml.includes("NUMPAGES") || docXml.includes("PAGE");
    const tieneCirculo = footersLower.includes("circle") || footersLower.includes("círculo") || footersXml.includes("w:oval") || footersXml.includes("w:sym");
    const logro3 = tieneCampoPagina && (tieneCirculo || footersXml.length > 0);

    evaluaciones.push({
        id: 3,
        nombre: "Numeración de página 'Círculo' en la parte inferior",
        pts: 10,
        logrado: logro3,
        feedback: logro3 
            ? "Numeración de página 'Círculo' configurada correctamente en el pie de página." 
            : "0 pts: No se detectó la numeración de página con formato 'Círculo' en el pie de página."
    });

    // --------------------------------------------------------------------------
    // 4. CONFIGURAR EN DOS COLUMNAS EL TEMA 3
    // --------------------------------------------------------------------------
    // En Word XML, las columnas se definen mediante la etiqueta <w:cols w:num="2"/>
    const tieneDosColumnas = docXml.includes('w:num="2"') || docXml.includes('w:cols w:num="2"');
    const logro4 = tieneDosColumnas;

    evaluaciones.push({
        id: 4,
        nombre: "Configuración en dos columnas para el Tema 3",
        pts: 10,
        logrado: logro4,
        feedback: logro4 
            ? "Sección de dos columnas verificada en el Tema 3." 
            : "0 pts: No se detectó el formato de 2 columnas en los párrafos del Tema 3."
    });

    // --------------------------------------------------------------------------
    // 5. MARGEN 'MODERADO'
    // --------------------------------------------------------------------------
    // Moderado en Word: Superior/Inferior 2.54 cm (1440 twips), Izquierdo/Derecho 1.91 cm (1080 twips)
    const tieneMargenModerado = docXml.includes('w:left="1080"') || docXml.includes('w:right="1080"') || docXml.includes('1080');
    const logro5 = tieneMargenModerado;

    evaluaciones.push({
        id: 5,
        nombre: "Aplicación del margen 'Moderado' al documento",
        pts: 10,
        logrado: logro5,
        feedback: logro5 
            ? "Márgenes 'Moderado' (Izquierdo/Derecho a 1.91 cm) aplicados correctamente." 
            : "0 pts: El documento no utiliza la configuración de márgenes 'Moderado'."
    });

    // --------------------------------------------------------------------------
    // 6. COLOR DE PÁGINA 'GRIS CLARO, FONDO 2'
    // --------------------------------------------------------------------------
    // Color hexadecimal de Gris claro, Fondo 2: E7E6E6, D9D9D9, E6E6E6 o w:background w:color="..."
    const tieneColorPagina = docXml.includes('<w:background') || docXml.includes('w:background');
    const tieneColorGris = docXml.includes('E7E6E6') || docXml.includes('D9D9D9') || docXml.includes('E6E6E6') || docXml.includes('F2F2F2');
    const logro6 = tieneColorPagina || tieneColorGris;

    evaluaciones.push({
        id: 6,
        nombre: "Color de página 'Gris claro, Fondo 2'",
        pts: 10,
        logrado: logro6,
        feedback: logro6 
            ? "Color de fondo de página 'Gris claro, Fondo 2' verificado." 
            : "0 pts: No se detectó la aplicación del color de página 'Gris claro, Fondo 2'."
    });

    // --------------------------------------------------------------------------
    // 7. COTIZACIÓN DE FILIGRANA EN EL TEMA 1
    // --------------------------------------------------------------------------
    const textoCotizacion = "A mayor liquidez, menor rendimiento esperado";
    const tieneTextoCotizacion = docXml.includes(textoCotizacion) || docLower.includes("principio fundamental de las finanzas");
    const tieneCuadroTexto = docXml.includes("w:txbxContent") || docXml.includes("w:pict") || docXml.includes("w:drawing");
    const logro7 = tieneTextoCotizacion && tieneCuadroTexto;

    evaluaciones.push({
        id: 7,
        nombre: "Cuadro de texto 'Cotización de filigrana' en Tema 1",
        pts: 10,
        logrado: logro7,
        feedback: logro7 
            ? "Cuadro de texto 'Cotización de filigrana' insertado correctamente con el principio de las finanzas." 
            : "0 pts: No se encontró el cuadro de texto 'Cotización de filigrana' con el texto especificado."
    });

    // --------------------------------------------------------------------------
    // 8. ÍCONO DE DINERO/FINANZAS AL INICIO DEL PRIMER PÁRRAFO
    // --------------------------------------------------------------------------
    const tieneImagenOIcono = mediaFiles.length > 0 || docXml.includes("<w:drawing>") || docXml.includes("a:blip") || docXml.includes("svg");
    const logro8 = tieneImagenOIcono;

    evaluaciones.push({
        id: 8,
        nombre: "Ícono relacionado a dinero o finanzas al inicio del primer párrafo",
        pts: 10,
        logrado: logro8,
        feedback: logro8 
            ? "Ícono gráfico de dinero/finanzas verificado al inicio del documento." 
            : "0 pts: No se insertó ningún ícono relacionado a dinero/finanzas."
    });

    // --------------------------------------------------------------------------
    // 9. FORMA 'PERGAMINO: HORIZONTAL' CON EL TEXTO "FINANZAS"
    // --------------------------------------------------------------------------
    const tieneFormaPergamino = docXml.includes("Horizontal Scroll") || docXml.includes("scroll") || docXml.includes("rect") || docXml.includes("w:drawing");
    const tieneTextoFinanzas = docXml.includes("FINANZAS") || docLower.includes("finanzas");
    const logro9 = tieneFormaPergamino && tieneTextoFinanzas;

    evaluaciones.push({
        id: 9,
        nombre: "Forma 'Pergamino: Horizontal' con el texto 'FINANZAS'",
        pts: 10,
        logrado: logro9,
        feedback: logro9 
            ? "Forma 'Pergamino: Horizontal' agregada al final con el texto 'FINANZAS'." 
            : "0 pts: No se encontró la forma 'Pergamino: Horizontal' o carece del texto 'FINANZAS'."
    });

    // --------------------------------------------------------------------------
    // 10. PROPIEDAD DEL DOCUMENTO 'COMENTARIOS'
    // --------------------------------------------------------------------------
    const tieneComentarioPropiedad = nombreEstudiante !== "No detectado" && nombreEstudiante.length > 2;
    const logro10 = tieneComentarioPropiedad;

    evaluaciones.push({
        id: 10,
        nombre: "Modificación de la propiedad 'Comentarios' con el nombre completo",
        pts: 10,
        logrado: logro10,
        feedback: logro10 
            ? `Propiedad de Comentarios/Descripción verificada: "${nombreEstudiante}".` 
            : "0 pts: No se configuró el nombre completo en la propiedad 'Comentarios' del documento."
    });

    // RENDERIZADO DE RESULTADOS EN PANTALLA
    let totalPuntaje = 0;
    const cuerpoTabla = document.getElementById('cuerpoTablaEvaluacion');
    cuerpoTabla.innerHTML = '';

    evaluaciones.forEach(item => {
        const puntos = item.logrado ? item.pts : 0;
        totalPuntaje += puntos;

        const badgeClass = item.logrado ? 'bg-exito' : 'bg-error';
        const badgeText = item.logrado ? `${item.pts} / ${item.pts} pts` : `0 / ${item.pts} pts`;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.nombre}</td>
            <td><span class="badge-status-td ${badgeClass}">${badgeText}</span></td>
            <td>${item.feedback}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    document.getElementById('puntajeValor').innerText = totalPuntaje;
    const badgeFinal = document.getElementById('badgeEstadoFinal');

    if (totalPuntaje >= 80) {
        badgeFinal.className = "status-badge bg-exito";
        badgeFinal.innerText = "APROBADO";
    } else {
        badgeFinal.className = "status-badge bg-error";
        badgeFinal.innerText = "REQUIERE CORRECCIÓN";
    }

    const panel = document.getElementById('panelResultadosHTML');
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth' });
}

function exportarReportePDF() {
    window.print();
}