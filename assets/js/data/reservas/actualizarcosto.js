document.addEventListener("DOMContentLoaded", function() {
    const reservaForm = document.querySelector('.reservation_form');
    const costoReservaElement = reservaForm.querySelector('#costoReserva'); // Elemento donde se mostrará el costo
    
    reservaForm.addEventListener('input', (event) => {
      // Obtener los valores del formulario
      const tiempoDeJuego = parseInt(reservaForm.querySelector('#tiempoDeJuego').value); // Convertir a entero
      const costoReserva = 60 * tiempoDeJuego; // Calcular costo de reserva
      
      // Actualizar el valor del costo de reserva en la vista
      costoReservaElement.value = costoReserva; // Actualizar valor del campo de texto
      
    });
  });
  