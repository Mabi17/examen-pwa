import './App.css'
import PropTypes from 'prop-types'
import { useState } from 'react'

function Titulo() {
  return (
    <div>
      <h1 className='text-primary-emphasis'>
        Diccionario
      </h1>
      <img src="diccionario.jpg" alt="" width="100px" />
      <img src="https://98556ab805.cbaul-cdnwnd.com/1e4314d32a2dd776316acbb4185d6ca9/200000008-dc7c7dd769/diccio.jpg" alt="" width="100px" />
      <img src="https://thumbs.dreamstime.com/b/marioneta-leyendo-el-diccionario-18328954.jpg" alt="" width="100px" />
    </div>
  )
}

function Formulario({ buscar }) {
  return (
    <div className='mt-4'>
      <form>
        <label>
          Ingresa una palabra en inglés para darte una definición
        </label>
        <div>
          <div className="input-group flex-nowrap">
            <input id="txtPalabra" type="text" className="form-control" placeholder="" aria-label="" aria-describedby="addon-wrapping" />
          </div>
        </div>
        <button type='submit' className='bg-primary mt-3' onClick={buscar}>Buscar</button>
      </form>
    </div>
  )
}

function Respuesta({ definicion }) {
  return (
    <div className="input-group mt-3">
      <textarea id="txtResponse" className="form-control bg-secondary-subtle" aria-label="With textarea" value={definicion} readOnly></textarea>
    </div>
  )
}

function Historial({ entradas }) {
  return (
    <div className="mt-4">
      <h3>Historial de palabras buscadas</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Palabra</th>
              <th>Definición</th>
            </tr>
          </thead>
          <tbody>
            {entradas.map(({ palabra, definicion }, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{palabra}</td>
                <td>{definicion}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

async function obtenerRespuesta(event, setDefinicion, setHistorial, historial) {
  event.preventDefault()
  var palabra = document.getElementById("txtPalabra").value.trim()
  if (!palabra) return

  var response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`)
    .then(reponse => reponse.json())
    .then(response => {
      return response
    })

  let definicion = response[0].meanings[0].definitions[0].definition

  setDefinicion(definicion)
  setHistorial([{ palabra, definicion }, ...historial])
  
}

function App() {
  const [definicion, setDefinicion] = useState('')
  const [historial, setHistorial] = useState([])

  setInterval(() => {
    window.location.reload();
  }, 15000);

  return (
    <>
      <Titulo />
      <Formulario buscar={(e) => obtenerRespuesta(e, setDefinicion, setHistorial, historial)} />
      <Respuesta definicion={definicion} />
      <Historial entradas={historial} />
    </>
  )
}

App.propTypes = {
  url: PropTypes.func.isRequired
}

Respuesta.propTypes = {
  definicion: PropTypes.string.isRequired,
}

Historial.propTypes = {
  entradas: PropTypes.arrayOf(
    PropTypes.shape({
      palabra: PropTypes.string.isRequired,
      definicion: PropTypes.string.isRequired,
    })
  ).isRequired,
}

Formulario.propTypes = {
  buscar: PropTypes.func.isRequired,
}

export default App
