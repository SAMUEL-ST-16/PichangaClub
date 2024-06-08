document.addEventListener("DOMContentLoaded", function () {
  const reservaForm = document.querySelector('.reservation_form');

  reservaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const fechaInput = reservaForm.querySelector('#fecha');
    const fecha = new Date(fechaInput.value).toISOString();
    const tiempoDeJuego = parseInt(reservaForm.querySelector('#tiempoDeJuego').value); // Convertir a entero
    const costoReserva = 60 * tiempoDeJuego; // Calcular costo de reserva
    const userId = parseInt(getCookie('userId'));

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const canchaId = parseInt(urlParams.get('canchaId'));

    // Crear la reserva
    try {
      const response = await fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fecha,
          usuarioId: userId,
          canchaId,
          costoReserva,
          tiempoDeJuego
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      console.log('Reserva creada exitosamente');
      // Después de que la reserva sea exitosa
      // Mostrar el modal de reserva exitosa
      document.getElementById('reservaExitosaModal').classList.remove('hidden');

      // Cerrar el modal y redirigir al usuario cuando haga clic en el botón de cerrar
      document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('reservaExitosaModal').classList.add('hidden');
        window.location.href = "/assets/views/canchas.html";
      });

      // También puedes redirigir automáticamente después de unos segundos
      setTimeout(function () {
        document.getElementById('reservaExitosaModal').classList.add('hidden');
        window.location.href = "/assets/views/canchas.html";
      }, 1000); // Cambia 3000 a la cantidad de milisegundos que desees que el modal sea visible antes de redirigir

      // Aquí puedes redirigir al usuario a una página de confirmación o realizar alguna otra acción

    } catch (error) {
      console.error('Error:', error.message);
      // Manejar el error aquí
    }
  });
});

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
