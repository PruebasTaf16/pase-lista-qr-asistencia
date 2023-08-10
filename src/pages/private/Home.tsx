import axios from 'axios';
import  { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import Swal from 'sweetalert2';
import { API_URL } from '../../constants/api';

/**Nuestra única y principal pantalla encargada de actualizar el día y por ende, generar el código qr */
const Home = () => {

  const [fecha, setFecha] = useState(new Date());
  const [fechaData, setFechaData] = useState({_id: ''});

  const [enviandoData, setEnviandoData] = useState(false)

  useEffect(() => {
    /**Cada segundo, actualiza la fecha */
    async function actualizarHora() {
      setInterval(() => {
        setFecha(new Date());
      }, 1000)
    }

    /**Cada segundo, actualiza el ID del día de hoy */
    async function actualizarFechaHoyDB() {
      setInterval(() => {
        obtenerFechaHoyDB()
      }, 1000)
    }

    /** Se busca desde la base de datos el ID del día de hoy, generando así el QR*/
    async function obtenerFechaHoyDB() {
      try {
        const response = await axios.get(API_URL+'/dias/hoy');
        const data = response.data.data;
        setFechaData(data)
        generarFechaHoy(data)
      } catch (e) {
        Swal.fire('Error', 'Ha ocurrido un error al obtener la fecha de hoy', 'error')
      }
    }

    /**Función encargada de generar el día, y así obtener el QR */
    async function generarFechaHoy(fechaObtenidaDB: any) {
      console.log("IMPLEMENTACIÓN MOVIDA EN EL API");
      return;
      try {
        const auxFecha = new Date()

        /**
         * Detectar si no hay fecha establecida desde la base de datos o detectar si la hora es entre las 00:00 y las 00:05
         */
        if (!fechaObtenidaDB || (auxFecha.getHours() == 0 && auxFecha.getMinutes() < 5)) {

          if (enviandoData) return;
          setEnviandoData(true)

          const response = await axios.post(API_URL + '/dias/generar-hoy', {});

          setFechaData(response.data.data)
        }
      } catch (e) {
        console.log('Actualizando...')
      } finally {
        setEnviandoData(false)
      }
    }

    actualizarHora()
    actualizarFechaHoyDB()
  }, [])
  
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <h2 className='text-center text-4xl text-gray-800 font-semibold'>Asistencia para Hoy</h2>
      <p className='text-center my-8 font-semibold'>Fecha de hoy: <span className='block text-blue-500 text-4xl'>{fecha.toLocaleString()}</span></p>

      <div className='container mx-auto my-10 mb-20 flex flex-col items-center justify-center'>
        <p className='text-xl font-medium text-gray-500 my-2'>Scanee el QR con la aplicación para contabilizar la asistencia de hoy</p>

        {
          enviandoData 
            ? <div className='mx-auto text-center font-medium text-4xl text-gray-500'>Cargando...</div>
            /** Aquí es donde se usa una librería para generar QR (se le puede catalogar como servicio externo)*/
            : <QRCode value={fechaData._id} size={350} className='border-2 border-gray-200 shadow-lg'/>

        }
      </div>
    </div>
  )
}

export default Home