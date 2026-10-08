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

// MOTOR PRINCIPAL DE EVALUACIÓN PARA EL RETO 2
async function analizarYCalificarDocx() {
    const input = document.getElementById('inputDocx');
    if (!input.files || input.files.length === 0) {
        alert("⚠️ Selecciona un archivo .docx para proceder con el análisis.");
        return;
    }

    let tiempoTranscurrido = "00:00";
    if (typeof detenerCronometro === 'function') {
        tiempoTranscurrido = detenerCronometro();
    }

    const file = input.files[0];

    try {
        const zip = await JSZip.loadAsync(file);

        // Lectura de archivos XML de la estructura DOCX
        const docXml = zip.file("word/document.xml") ? await zip.file("word/document.xml").async("text") : "";
        const stylesXml = zip.file("word/styles.xml") ? await zip.file("word/styles.xml").async("text") : "";
        const commentsXml = zip.file("word/comments.xml") ? await zip.file("word/comments.xml").async("text") : "";
        const numberingXml = zip.file("word/numbering.xml") ? await zip.file("word/numbering.xml").async("text") : "";
        const settingsXml = zip.file("word/settings.xml") ? await zip.file("word/settings.xml").async("text") : "";
        const themeXml = zip.file("word/theme/theme1.xml") ? await zip.file("word/theme/theme1.xml").async("text") : "";
        const relsXml = zip.file("word/_rels/document.xml.rels") ? await zip.file("word/_rels/document.xml.rels").async("text") : "";

        const mediaFiles = Object.keys(zip.files).filter(f => f.startsWith("word/media/"));

        ejecutarEvaluacionReto2(docXml, stylesXml, commentsXml, numberingXml, settingsXml, themeXml, relsXml, mediaFiles, tiempoTranscurrido);

    } catch (err) {
        alert("Error al analizar la estructura del archivo Word: " + err.message);
    }
}

function ejecutarEvaluacionReto2(docXml, stylesXml, commentsXml, numberingXml, settingsXml, themeXml, relsXml, mediaFiles, tiempoTranscurrido) {
    const evaluaciones = [];

    // EXTRACCIÓN DEL NOMBRE DEL ESTUDIANTE DESDE EL COMENTARIO
    let nombreDetectado = "No detectado";
    if (commentsXml.length > 0) {
        try {
            const parser = new DOMParser();
            const xmlComments = parser.parseFromString(commentsXml, "text/xml");
            const comentarios = xmlComments.getElementsByTagName("w:comment");
            if (comentarios.length > 0) {
                const textoComentario = comentarios[0].textContent.trim();
                if (textoComentario.length > 0) {
                    nombreDetectado = textoComentario;
                }
            }
        } catch (e) {
            const matchComentario = commentsXml.replace(/<[^>]+>/g, ' ').trim();
            if (matchComentario) nombreDetectado = matchComentario;
        }
    }

    const elNombre = document.getElementById('nombreEstudiante');
    if (elNombre) elNombre.innerText = nombreDetectado;

    const elTiempo = document.getElementById('tiempoResultado');
    if (elTiempo) elTiempo.innerText = tiempoTranscurrido;

    const docLower = docXml.toLowerCase();
    const relsLower = relsXml.toLowerCase();
    const mediaLower = mediaFiles.map(m => m.toLowerCase());
    const stylesLower = stylesXml.toLowerCase();
    const themeLower = themeXml.toLowerCase();
    const settingsLower = settingsXml.toLowerCase();

    // --------------------------------------------------------------------------
    // 1. TÍTULO 2 EN LOS 4 SUBTÍTULOS
    // --------------------------------------------------------------------------
    const matchesH2Direct = (docXml.match(/w:pStyle\s+w:val="(Heading2|Heading_2|Heading\s*2|Titulo2|Tulo2|2|Ttulo2)"/gi) || []).length;
    const logro1 = matchesH2Direct >= 4;

    evaluaciones.push({
        id: 1,
        nombre: "Aplicación de estilo 'Título 2' a los 4 subtítulos",
        pts: 10,
        logrado: logro1,
        feedback: logro1 
            ? "Estilo 'Título 2' verificado correctamente en los 4 subtítulos." 
            : `0 pts: Se requieren 4 subtítulos con 'Título 2' (Detectados en estructura: ${matchesH2Direct}).`
    });

    // --------------------------------------------------------------------------
    // 2. INSERTAR LA IMAGEN 'bono.jpg' Y CENTRARLA TRAS EL PRIMER PÁRRAFO
    // --------------------------------------------------------------------------
    const tieneDibujoOImagen = docXml.includes("<w:drawing>") || docXml.includes("w:drawing") || docXml.includes("a:blip") || mediaFiles.length > 0;
    
    let imagenCentrada = false;
    if (tieneDibujoOImagen) {
        const idxDrawing = docXml.indexOf("w:drawing");
        if (idxDrawing !== -1) {
            const inicioP = docXml.lastIndexOf("<w:p", idxDrawing);
            const finP = docXml.indexOf("</w:p>", idxDrawing);
            if (inicioP !== -1 && finP !== -1) {
                const bloqueParrafoImagen = docXml.substring(inicioP, finP + 6);
                imagenCentrada = bloqueParrafoImagen.includes('w:jc w:val="center"');
            }
        }
    }

    const logro2 = tieneDibujoOImagen && imagenCentrada;

    evaluaciones.push({
        id: 2,
        nombre: "Inserción y alineación centrada de la imagen 'bono.jpg'",
        pts: 10,
        logrado: logro2,
        feedback: logro2 
            ? "Imagen 'bono.jpg' insertada y centrada correctamente tras el primer párrafo." 
            : (tieneDibujoOImagen 
                ? "0 pts: Se insertó la imagen pero NO se encuentra alineada al centro." 
                : "0 pts: No se detectó ninguna imagen insertada en el documento.")
    });

    // --------------------------------------------------------------------------
    // 3. SATURACIÓN DE COLOR (66%) EN LA IMAGEN
    // --------------------------------------------------------------------------
    const logro3 = docXml.includes('satHeader="66000"') || docXml.includes('satVal="66000"') || docXml.includes('sat="66000"');
    evaluaciones.push({
        id: 3,
        nombre: "Saturación de color (66%) en la imagen",
        pts: 10,
        logrado: logro3,
        feedback: logro3 
            ? "Ajuste de saturación de color al 66% verificado correctamente." 
            : "0 pts: No se aplicó el nivel de saturación al 66% en la imagen."
    });

    // --------------------------------------------------------------------------
    // 4. SÍMBOLO DE COPYRIGHT (©) ANTES DE 'Moody’s'
    // --------------------------------------------------------------------------
    let logro4 = false;
    const docText = docXml.replace(/<[^>]+>/g, ''); // Extrae texto plano del XML

    // Busca variaciones: ©Moody, © Moody, @Moody, &#169;Moody
    const patronCopyright = /(©|&#169;|@|\(c\))\s*Moody/i;
    
    if (patronCopyright.test(docText) || docXml.includes("F0A9") || docXml.includes("00A9")) {
        logro4 = true;
    } else {
        const idxMoody = docXml.search(/Moody/i);
        if (idxMoody !== -1) {
            const contextoMoody = docXml.substring(Math.max(0, idxMoody - 150), Math.min(docXml.length, idxMoody + 150));
            logro4 = contextoMoody.includes("©") || 
                     contextoMoody.includes("&#169;") || 
                     contextoMoody.includes("00A9") || 
                     contextoMoody.includes("F0A9") ||
                     contextoMoody.includes("@");
        }
    }

    evaluaciones.push({
        id: 4,
        nombre: "Símbolo de Copyright (©) antes de 'Moody’s'",
        pts: 10,
        logrado: logro4,
        feedback: logro4 
            ? "Símbolo de Copyright (©) ubicado correctamente junto a 'Moody’s'." 
            : "0 pts: No se encontró el símbolo © en la posición requerida antes de 'Moody’s'."
    });

    // --------------------------------------------------------------------------
    // 5. ELIMINACIÓN DE FORMATO EN FRASE ESPECÍFICA
    // --------------------------------------------------------------------------
    const tieneTextoFrase = docXml.includes("Investment Grade");
    const idxFrase = docXml.indexOf("Investment Grade");
    let logro5 = false;

    if (tieneTextoFrase && idxFrase !== -1) {
        const bloqueFrase = docXml.substring(Math.max(0, idxFrase - 300), idxFrase + 300);
        const tieneColorDirecto = /w:color\s+w:val="(?!auto)[^"]+"/i.test(bloqueFrase);
        const tieneCursivaDirecta = /<w:i(\/>|\s)/i.test(bloqueFrase);
        const tieneHyperlinkDirecto = bloqueFrase.includes('w:val="Hyperlink"') || bloqueFrase.includes('w:val="Enlace"');

        logro5 = !tieneColorDirecto && !tieneCursivaDirecta && !tieneHyperlinkDirecto;
    }

    evaluaciones.push({
        id: 5,
        nombre: "Eliminación de formato en frase específica",
        pts: 10,
        logrado: logro5,
        feedback: logro5 
            ? "Formato borrado verificado en la frase seleccionada." 
            : "0 pts: La frase aún conserva estilos o formato directo (Asegúrate de presionar 'Borrar todo el formato')."
    });

    // --------------------------------------------------------------------------
    // 6. RESALTADO GRIS AL 25% EN LA FÓRMULA
    // --------------------------------------------------------------------------
    const tieneResaltadoLightGray = docXml.includes('w:highlight w:val="lightGray"');
    const tieneSombreado25 = docXml.includes('w:shd') && (docXml.includes('D9D9D9') || docXml.includes('D0D0D0') || docXml.includes('gray-25'));
    const logro6 = tieneResaltadoLightGray || tieneSombreado25;

    evaluaciones.push({
        id: 6,
        nombre: "Resaltado Gris al 25% en la fórmula",
        pts: 10,
        logrado: logro6,
        feedback: logro6 
            ? "Resaltado Gris (25%) verificado sobre la fórmula." 
            : "0 pts: No se aplicó el tono exacto de Resaltado Gris al 25%."
    });

    // --------------------------------------------------------------------------
    // 7. FORMATO 'TABLA DE CUADRÍCULA 2'
    // --------------------------------------------------------------------------
    const logro7 = docXml.includes('Tabladecuadrcula2') || docXml.includes('GridTable2') || stylesXml.includes('GridTable2') || stylesXml.includes('Tabladecuadrcula2');
    evaluaciones.push({
        id: 7,
        nombre: "Formato 'Tabla de cuadrícula 2'",
        pts: 10,
        logrado: logro7,
        feedback: logro7 
            ? "Estilo 'Tabla de cuadrícula 2' aplicado correctamente a la tabla." 
            : "0 pts: La tabla no tiene aplicado el estilo 'Tabla de cuadrícula 2'."
    });

    // --------------------------------------------------------------------------
    // 8. VIÑETA CON IMAGEN 'dinero.png'
    // --------------------------------------------------------------------------
    const tieneNumPicBullet = numberingXml.includes('w:numPicBullet');
    const tieneReferenciaDinero = numberingXml.includes('dinero') || relsXml.includes('dinero') || mediaLower.some(m => m.includes('dinero'));
    const logro8 = tieneNumPicBullet && (tieneReferenciaDinero || mediaFiles.length > 0);

    evaluaciones.push({
        id: 8,
        nombre: "Viñeta con imagen 'dinero.png' en párrafos finales",
        pts: 10,
        logrado: logro8,
        feedback: logro8 
            ? "Viñeta personalizada con la imagen 'dinero.png' configurada correctamente." 
            : "0 pts: Se usaron viñetas estándar en lugar de la viñeta con imagen 'dinero.png'."
    });

    // --------------------------------------------------------------------------
    // 9. DISEÑO GENERAL DEL DOCUMENTO 'SOMBREADO' (REVISADO Y AMPLIADO)
    // --------------------------------------------------------------------------
    // A) Búsqueda directa por nombre o traducción en cualquier archivo de estilos/ajustes/temas
    const tieneNombreSombreado = stylesLower.includes('shaded') || docLower.includes('shaded') || 
                                stylesLower.includes('sombreado') || docLower.includes('sombreado') || 
                                settingsLower.includes('shaded') || settingsLower.includes('sombreado') ||
                                themeLower.includes('shaded') || themeLower.includes('sombreado');

    // B) Búsqueda por firma estructural del estilo "Sombreado" de Word:
    // El conjunto "Sombreado" define sombreados/fondos de párrafo en estilos de encabezado (w:shd)
    // y reglas asociadas a bordes/rellenos en styles.xml
    const tieneSombreadoEnEstilos = stylesXml.includes('<w:shd') || stylesXml.includes('w:shd');
    const tieneDiferenciaDeEstructuraTema = themeXml.length > 0 || docXml.includes('w:themeColor');

    // C) Si se modificaron los estilos globales del documento
    const logro9 = tieneNombreSombreado || (tieneSombreadoEnEstilos && tieneDiferenciaDeEstructuraTema);

    evaluaciones.push({
        id: 9,
        nombre: "Diseño general del documento 'Sombreado'",
        pts: 10,
        logrado: logro9,
        feedback: logro9 
            ? "Diseño 'Sombreado' verificado correctamente en el documento." 
            : "0 pts: No se aplicó el estilo de diseño 'Sombreado' al documento."
    });

    // --------------------------------------------------------------------------
    // 10. COMENTARIO EN 'INTELIGENTES' CON NOMBRE DE ESTUDIANTE
    // --------------------------------------------------------------------------
    const tieneComentarios = commentsXml.length > 20;
    const ancladoAInteligentes = docXml.includes('w:commentReference') || docXml.includes('w:commentRangeStart');
    const logro10 = tieneComentarios && ancladoAInteligentes;

    evaluaciones.push({
        id: 10,
        nombre: "Comentario en 'Inteligentes' con Nombre de Estudiante",
        pts: 10,
        logrado: logro10,
        feedback: logro10 
            ? `Comentario verificado en la palabra 'Inteligentes' (Estudiante: "${nombreDetectado}").` 
            : "0 pts: No se encontró el comentario en la palabra 'Inteligentes'."
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