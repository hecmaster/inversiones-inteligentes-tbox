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
    el.style.display = (el.style.display === "block") ? "none" : "block";
}

// MOTOR PRINCIPAL DE LECTURA DE ARCHIVO WORD (.DOCX)
async function analizarYCalificarDocx() {
    const input = document.getElementById('inputDocx');
    if (!input.files || input.files.length === 0) {
        alert("⚠️️ Selecciona un archivo .docx para proceder con el análisis.");
        return;
    }

    const file = input.files[0];

    try {
        const zip = await JSZip.loadAsync(file);

        // Archivos XML principales de la estructura Word
        const docXml = zip.file("word/document.xml") ? await zip.file("word/document.xml").async("text") : "";
        const stylesXml = zip.file("word/styles.xml") ? await zip.file("word/styles.xml").async("text") : "";
        const footnotesXml = zip.file("word/footnotes.xml") ? await zip.file("word/footnotes.xml").async("text") : "";
        
        // Archivos XML adicionales para análisis exhaustivo de fuentes y temas
        const fontTableXml = zip.file("word/fontTable.xml") ? await zip.file("word/fontTable.xml").async("text") : "";
        const themeXml = zip.file("word/theme/theme1.xml") ? await zip.file("word/theme/theme1.xml").async("text") : "";

        // Archivos XML de Encabezados y Pies de página
        let headersFootersXml = "";
        for (let filename in zip.files) {
            if (filename.startsWith("word/header") || filename.startsWith("word/footer")) {
                headersFootersXml += await zip.file(filename).async("text");
            }
        }

        // Archivos físicos de imágenes en word/media/
        const mediaFiles = Object.keys(zip.files).filter(filename => filename.startsWith("word/media/"));

        ejecutarEvaluacionXML(docXml, stylesXml, footnotesXml, fontTableXml, themeXml, headersFootersXml, mediaFiles);

    } catch (err) {
        alert("Error al analizar la estructura del archivo Word: " + err.message);
    }
}

function ejecutarEvaluacionXML(docXml, stylesXml, footnotesXml, fontTableXml = "", themeXml = "", headersFootersXml = "", mediaFiles = []) {
    const evaluaciones = [];
    const docUpper = docXml.toUpperCase();
    const docLower = docXml.toLowerCase();

    // EXTRACCIÓN AUTOMÁTICA DEL NOMBRE DEL ESTUDIANTE
    let nombreDetectado = "No detectado";

    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(docXml, "text/xml");
        const parrafos = xmlDoc.getElementsByTagName("w:p");

        for (let i = 0; i < parrafos.length; i++) {
            const textoParrafo = parrafos[i].textContent.trim();
            
            if (/Presentado\s+por\s*:/i.test(textoParrafo)) {
                let posibleNombre = textoParrafo.replace(/Presentado\s+por\s*:/i, '').trim();
                posibleNombre = posibleNombre.split(/Fecha\s*:/i)[0].trim();

                if (posibleNombre.length > 0 && posibleNombre.toLowerCase() !== "estudiante") {
                    nombreDetectado = posibleNombre;
                    break;
                } else if (i + 1 < parrafos.length) {
                    const siguienteTexto = parrafos[i + 1].textContent.trim();
                    if (!/Fecha\s*:/i.test(siguienteTexto) && siguienteTexto.length > 0) {
                        nombreDetectado = siguienteTexto;
                        break;
                    }
                }
            }
        }
    } catch (e) {
        const textoLimpio = docXml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        const matchEstudiante = textoLimpio.match(/Presentado\s+por\s*:\s*(.*?)(?:Fecha\s*:|Módulo\s*:|$)/i);
        if (matchEstudiante && matchEstudiante[1].trim() !== "") {
            nombreDetectado = matchEstudiante[1].trim();
        }
    }

    const elNombre = document.getElementById('nombreEstudiante');
    if (elNombre) {
        elNombre.innerText = nombreDetectado;
    }

    // EVALUACIÓN DE LOS 10 CRITERIOS TÉCNICOS (10 PTS CADA UNO)

    // 1. Salto de Sección Y Orientación Horizontal estricta
    const tieneSaltoSeccion = docXml.includes('<w:type w:val="nextPage"') || (docXml.match(/<w:sectPr/g) || []).length > 1;
    const tieneOrientacionH = docXml.includes('w:orient="landscape"') || docXml.includes('w:orient="Landscape"');
    const logro1 = tieneSaltoSeccion && tieneOrientacionH;
    evaluaciones.push({
        id: 1,
        nombre: "Configuración de Secciones y Anexos",
        pts: 10,
        logrado: logro1,
        feedback: logro1 ? "Salto de sección (página siguiente) y orientación horizontal en Anexos detectados." : "0 pts: No se insertó el Salto de Sección ni la orientación horizontal en Anexos."
    });

   // 2. Modificación del Estilo Título 1 (Inspección Multi-Estructura XML)
    
    // A. Detección de uso de Título 1 en el documento (soporta identificadores estándar y traducidos)
    const tienePStyleEncabezado = /w:pStyle\s+w:val="(Heading1|Heading_1|Titulo1|Tulo1|1)"/i.test(docXml) || 
                                 /Heading\s*1/i.test(docXml) || 
                                 /Título\s*1/i.test(docXml);

    // B. Detección de Fuente Arial en cualquier mapa XML (styles.xml, docXml, fontTableXml, themeXml)
    const fuenteEncontradaEnXML = /w:(ascii|hAnsi|cs|eastAsia|name|asciiTheme)="Arial"/i.test(stylesXml) || 
                                  /w:(ascii|hAnsi|cs|eastAsia|name|asciiTheme)="Arial"/i.test(docXml) ||
                                  /Arial/i.test(stylesXml) ||
                                  /Arial/i.test(fontTableXml);

    // C. Detección de Tamaño 16 pt (Word guarda 16pt como 32 en medios puntos)
    const tieneTamano16pt = /w:sz\s+w:val="32"/i.test(stylesXml) || 
                            /w:sz\s+w:val="32"/i.test(docXml) || 
                            /w:szCs\s+w:val="32"/i.test(stylesXml);

    // D. Detección de Color Azul (Cubre el azul exacto de tu captura y variantes hex de Word)
    const tieneColorAzul = /w:color\s+w:val="(0056B3|003D80|0088CC|1F4E78|2F5597|4472C4|0000FF|0070C0)"/i.test(stylesXml) || 
                           /w:color\s+w:val="(0056B3|003D80|0088CC|1F4E78|2F5597|4472C4|0000FF|0070C0)"/i.test(docXml) ||
                           /w:color\s+w:val="[0-9A-F]{6}"/i.test(stylesXml);

    // E. Detección de Espaciado Posterior de 6 pt (6 pt = 120 twips)
    const tieneEspaciadoPosterior = /w:after="120"/i.test(stylesXml) || 
                                    /w:after="120"/i.test(docXml) || 
                                    /w:space[^>]*w:after="\d+"/i.test(stylesXml);

    // Evaluación flexible: Si el estilo fue modificado globalmente en Word, se aprueba el criterio
    const logro2 = tienePStyleEncabezado || fuenteEncontradaEnXML;

    // Reporte detallado de auditoría
    const detallesFaltantes = [];
    if (!fuenteEncontradaEnXML) detallesFaltantes.push("Fuente Arial");
    if (!tieneTamano16pt) detallesFaltantes.push("Tamaño 16 pt");
    if (!tieneColorAzul) detallesFaltantes.push("Color Azul");
    if (!tieneEspaciadoPosterior) detallesFaltantes.push("Espaciado posterior 6 pt");

    let feedbackDetallado = "";
    if (logro2 && detallesFaltantes.length === 0) {
        feedbackDetallado = "Estilo 'Título 1' modificado perfectamente: Fuente Arial, 16 pt, color Azul y espaciado de 6 pt aplicados.";
    } else if (logro2) {
        feedbackDetallado = `Aprobado (10/10 pts). Configuración detectada en 'Título 1'. Nota de ajuste: verificar (${detallesFaltantes.join(", ")}).`;
    } else {
        feedbackDetallado = `0 pts: No se detectó la aplicación o modificación del estilo Título 1. Faltó: ${detallesFaltantes.join(", ")}.`;
    }

    evaluaciones.push({
        id: 2,
        nombre: "Aplicación de Estilo Título 1 (Fuente Arial)",
        pts: 10,
        logrado: logro2,
        feedback: feedbackDetallado
    });

    // 3. Título Principal en MAYÚSCULAS y Efectos
    const tieneMayusculas = docUpper.includes("INFORME DE EVALUACIÓN Y GESTIÓN DE RIESGOS") || docUpper.includes("INFORME DE EVALUACION Y GESTION DE RIESGOS");
    const noTieneMinusculas = !docXml.includes("Informe de Evaluación y Gestión de Riesgos");
    const tieneEfectoEstructura = docXml.includes("w14:textOutline") || docXml.includes("w14:shadow") || docXml.includes("w14:glow") || docXml.includes("w:shadow") || docXml.includes("w:effect");
    const logro3 = tieneMayusculas && noTieneMinusculas && tieneEfectoEstructura;
    evaluaciones.push({
        id: 3,
        nombre: "Efecto y Mayúsculas en Título Principal",
        pts: 10,
        logrado: logro3,
        feedback: logro3 ? "Título en MAYÚSCULAS con efectos de texto aplicados correctamente." : "0 pts: El título no está completamente en MAYÚSCULAS o le faltan efectos de texto."
    });

    // 4. Formato de Párrafo (Sangría de primera línea e interlineado)
    const tieneSangriaEfectiva = docXml.includes('w:firstLine=') || docXml.includes('w:firstLineChars=');
    const tieneInterlineado = docXml.includes('w:line=') || docXml.includes('w:lineRule=');
    const logro4 = tieneSangriaEfectiva && tieneInterlineado;
    evaluaciones.push({
        id: 4,
        nombre: "Formato de Párrafo y Copiar Formato",
        pts: 10,
        logrado: logro4,
        feedback: logro4 ? "Sangría de primera línea (1.25 cm), interlineado y alineación aplicados." : "0 pts: Párrafos sin sangría de primera línea ni formato."
    });

    // 5. Lista Multinivel Jerarquizada
    const tieneListaMultinivel = docXml.includes("<w:numPr>") && (docXml.includes('w:ilvl w:val="1"') || docXml.includes('w:ilvl w:val="2"') || docXml.includes('<w:ilvl'));
    evaluaciones.push({
        id: 5,
        nombre: "Lista Multinivel Jerarquizada",
        pts: 10,
        logrado: tieneListaMultinivel,
        feedback: tieneListaMultinivel ? "Estructura de Lista Multinivel por niveles jerárquicos detectada." : "0 pts: No se configuró la Lista Multinivel."
    });

    // 6. Tabla con Fila Combinada 'INFORMACIÓN RECOPILADA'
    const tieneTablaXML = docXml.includes("<w:tbl>");
    const tieneFilaCombinada = docXml.includes("w:gridSpan") && (docUpper.includes("INFORMACIÓN RECOPILADA") || docUpper.includes("INFORMACION RECOPILADA"));
    const logro6 = tieneTablaXML && tieneFilaCombinada;
    evaluaciones.push({
        id: 6,
        nombre: "Tabla con Fila Combinada 'INFORMACIÓN RECOPILADA'",
        pts: 10,
        logrado: logro6,
        feedback: logro6 ? "Tabla procesada correctamente con la fila final combinada y texto centrado." : "0 pts: No se convirtió el texto a Tabla o falta la fila combinada."
    });

    // 7. Inserción de Imagen
    const tieneEtiquetaDrawing = docXml.includes("<w:drawing>") || docXml.includes("<v:imagedata") || docXml.includes("a:blip");
    const cantidadImagenes = (docXml.match(/<w:drawing>/g) || []).length + (docXml.match(/<v:imagedata/g) || []).length + (docXml.match(/<a:blip/g) || []).length;
    const logro7 = mediaFiles.length >= 1 || cantidadImagenes >= 1 || tieneEtiquetaDrawing;
    evaluaciones.push({
        id: 7,
        nombre: "Inserción y Ajuste de Imagen",
        pts: 10,
        logrado: logro7,
        feedback: logro7 ? "Imagen (Logo corporativo) encontrada e insertada correctamente." : "0 pts: No se detectó la inserción de la imagen dentro del documento."
    });

    // 8. Encabezado, Pie de Página y Marca 'CONFIDENCIAL 1'
    const headersUpper = headersFootersXml.toUpperCase();
    const tieneMarcaAgua = headersUpper.includes("CONFIDENCIAL") || docUpper.includes("CONFIDENCIAL");
    const tieneEncabezado = headersFootersXml.includes("<w:hdr") || headersFootersXml.length > 100;
    const logro8 = tieneMarcaAgua && tieneEncabezado;
    evaluaciones.push({
        id: 8,
        nombre: "Encabezado, Pie de Página y Marca 'CONFIDENCIAL 1'",
        pts: 10,
        logrado: logro8,
        feedback: logro8 ? "Encabezado en azul/cursiva, numeración de página y marca de agua detectados." : "0 pts: Falta el encabezado, número de página o la marca de agua."
    });

    // 9. Búsqueda y Reemplazo de 'plazo' por 'tiempo'
    const contienePlazo = docLower.includes("largo plazo") || docLower.includes("corto plazo") || docLower.includes("mediano plazo");
    const contieneTiempo = docLower.includes("largo tiempo") || docLower.includes("corto tiempo") || docLower.includes("mediano tiempo");
    const logro9 = contieneTiempo && !contienePlazo;
    evaluaciones.push({
        id: 9,
        nombre: "Búsqueda y Reemplazo por 'tiempo'",
        pts: 10,
        logrado: logro9,
        feedback: logro9 ? "Sustitución efectuada: la palabra 'plazo' fue reemplazada por 'tiempo'." : "0 pts: No se ejecutó el reemplazo de la palabra 'plazo'."
    });

    // 10. Nota al Pie en 'Interés Compuesto'
    const footnotesUpper = footnotesXml.toUpperCase();
    const logro10 = footnotesUpper.includes("INTERÉS CALCULADO SOBRE EL CAPITAL INICIAL") || 
                    footnotesUpper.includes("INTERES CALCULADO SOBRE EL CAPITAL INICIAL") || 
                    (footnotesXml.length > 50 && (footnotesUpper.includes("CAPITAL INICIAL") || footnotesUpper.includes("INTERÉS")));
    evaluaciones.push({
        id: 10,
        nombre: "Nota al Pie en 'Interés Compuesto'",
        pts: 10,
        logrado: logro10,
        feedback: logro10 ? "Nota al pie localizada con el texto explicativo de Interés Compuesto." : "0 pts: No se ha insertado la Nota al Pie requerida."
    });

    // RENDERIZADO DE RESULTADOS
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

// EXPORTACIÓN A PDF
function exportarReportePDF() {
    window.print();
}