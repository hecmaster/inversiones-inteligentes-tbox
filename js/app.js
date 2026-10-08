// Variable para llevar el estado global de respuestas del estudiante
let respuestasEvaluacion = {};

// Función invocada por los botones onclick="abrirCuestionarioTeorico(id)" en index.html
function abrirCuestionarioTeorico(idModulo) {
    const modulo = bancoTeorico[idModulo];
    if (!modulo) return;

    let htmlContent = `
        <div class="theory-modal-header">
            <h2><i class="fa-solid fa-clipboard-question"></i> ${modulo.titulo}</h2>
            <p>${modulo.descripcion}</p>
        </div>
        <form id="formTeorico_${idModulo}" class="quiz-form">
    `;

    modulo.preguntas.forEach((p, pIndex) => {
        htmlContent += `
            <div class="question-card" id="card_${p.id}">
                <span class="topic-tag"><i class="fa-solid fa-tag"></i> ${p.tema}</span>
                <h4>${pIndex + 1}. ${p.pregunta}</h4>
                <div class="options-group">
        `;

        p.opciones.forEach((opcion, oIndex) => {
            htmlContent += `
                <label class="option-label">
                    <input type="radio" name="${p.id}" value="${oIndex}" onchange="validarRespuestaTeorica(${idModulo}, '${p.id}', ${oIndex})">
                    <span>${opcion}</span>
                </label>
            `;
        });

        htmlContent += `
                </div>
                <div class="feedback-box" id="feedback_${p.id}" style="display: none;"></div>
            </div>
        `;
    });

    htmlContent += `
        </form>
        <div class="quiz-footer">
            <button class="btn btn-final" onclick="cerrarModal()"><i class="fa-solid fa-check"></i> Finalizar</button>
        </div>
    `;

    // Inyectar en el modal de tu HTML
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = htmlContent;
    
    // Mostrar modal
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

// Función que valida de manera inmediata la opción seleccionada y brinda retroalimentación
function validarRespuestaTeorica(idModulo, idPregunta, opcionSeleccionada) {
    const modulo = bancoTeorico[idModulo];
    const preguntaObj = modulo.preguntas.find(p => p.id === idPregunta);
    const feedbackBox = document.getElementById(`feedback_${idPregunta}`);

    feedbackBox.style.display = 'block';

    if (opcionSeleccionada === preguntaObj.correcta) {
        feedbackBox.className = 'feedback-box feedback-success';
        feedbackBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>¡Correcto!</strong> ${preguntaObj.retroalimentacion}`;
    } else {
        feedbackBox.className = 'feedback-box feedback-error';
        feedbackBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Incorrecto.</strong> Intenta nuevamente. Revisa el concepto relacionado con: <em>${preguntaObj.tema}</em>.`;
    }
}

// Función global para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}