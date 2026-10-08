// Control de Ventana Modal
function abrirModalElemento(elementoContenido) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  modalBody.appendChild(elementoContenido);
  modal.style.display = "block";
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Evento para cerrar el modal haciendo clic afuera
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    cerrarModal();
  }
};