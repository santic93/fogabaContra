import React, { useEffect } from 'react'
import axios from "axios"
import { useContext } from 'react';
import Context from '../../Context/Context';
export default function Operaciones() {
  const user = localStorage.getItem("user")
  const parts = user.split(",");
  const primeraPalabra = parts[0];
  const { completeTradicionalesYTradicionalesExpress, tradicionalesYTradicionalesExpress } = useContext(Context)
  useEffect(() => {
    const fetchData = async () => {
      await axios.get('/operaciones', {
        params: {
          primeraPalabra: encodeURIComponent(primeraPalabra),
        },
      }).then((res) => {
        const tradicionales = res.data.data;
        const operacionesDeCheques = res.data.data2;
        const operacionesWag = res.data.data3
        console.log(tradicionales, operacionesDeCheques, operacionesWag)
        // completeTradicionalesYTradicionalesExpress(res.data)
      }).catch((error) => console.log(error))
    }
    fetchData()
  }, [])
  console.log(tradicionalesYTradicionalesExpress)
  return (
    <div>Operaciones</div>
  )
}
