const mostrarCartas = (_pelicula) => {
  const carta = document.createElement('div');
  carta.setAttribute('class', 'card');
  carta.innerHTML = `
  <div class="carta">
  <img src=${_pelicula.image} alt="" />
    <div class="info">
      <h3>${_pelicula.nombrePelicula}</h3>
      <h4>${_pelicula.puntaje}</h4>
      <h4>${_pelicula.genero}</h4>
    </div>
  </div>`;

  return carta;
};

const URL_SERVER = `http://localhost:3000/peliculas`;

const contenedorCartas = document.getElementById('contenedor-cartas');

const hacerPeticion = async (_url, _busqueda = '') => {
  const peticion = await (await fetch(`${_url}?q=${_busqueda}`)).json();
  for (let i = 0; i < peticion.length; i++) {
    const pelicula = peticion[i];
    contenedorCartas.appendChild(mostrarCartas(pelicula));
  }
};

hacerPeticion(URL_SERVER);

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  contenedorCartas.innerHTML = '';
  const busqueda = e.target.search.value;
  hacerPeticion(URL_SERVER, busqueda);
});
