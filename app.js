const divif = document.querySelector('.climainfo')
const input = document.querySelector('.inputs')
const inputb = document.querySelector('.button').addEventListener('click', () => geolocalizar(input.value))


window.onload = () => {
  geolocalizar("guadalajara")
}


const spinerloadhtl = () => {

  divif.innerHTML = `
  </div><div class="sk-cube-grid">
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    <p clas="sk-cube">Buscando</p>
    </div>
</div>`
}


async function geolocalizar(value) {

  spinerloadhtl()
  const key = "c3d1169ac870ab4ac725b048a6341e99"
  const uri = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=es&appid=${key}`
  const res = await fetch(uri)
  const data = await res.json()

  data.cod == 400 || data.cod == 404 ?
    divif.innerHTML = `
      <img src="./img/animated/error-404.png" alt="">
      <p clas="sk-cube">No se a Encontrado esta Cudad</p>
      `
    : generarcontenido(data)
}

function generarcontenido(data) {

  const grad = grads(data.main.temp)
  const min = grads(data.main.temp_min)
  const max = grads(data.main.temp_max)
  let date = new Date();
  let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();


  divif.innerHTML = ` 
  <div class="climainfo" id="climainfo">
    <h2>${data.name}, ${data.sys.country}.</h2>
    <p class="datat">${output}</p>
    <p class="descrop">${data.weather[0].description}</p>
  
    <div class="icon">
      <img src="./img/animated/${data.weather[0].main}.svg" alt="">
      <div class="temp">
        <p>Temperatura</p>
        <p class="grados">${grad}&deg;</p>
        <p class="minmax">${min}&deg; / ${max}&deg;</p>
      </div>
  </div>

  
</div>`
}
const grads = sg => parseInt(sg - 273.15)
