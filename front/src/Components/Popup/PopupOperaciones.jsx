import { useContext, useEffect, useState } from 'react';
import "./PopupOperaciones.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../../Context/Context';
export default function PopupOperaciones() {
    const { idComentario } = useParams()
    const { completeComentarios, comentariosComercial } = useContext(Context)
    console.log(comentariosComercial)
    const navigate = useNavigate()
    useEffect(() => {
        const data = async () => {
            await axios.get('/comentarios', {
                params: {
                    idComentario: encodeURIComponent(idComentario),
                },
            }).then((res) => completeComentarios(res.data)).catch((error) => console.warn(error))
        }
        data()
    }, [])

    // Dividir la cadena en función de la coma
    let partes;
    let resultado;
    if (localStorage.getItem("user")) {
        partes = localStorage?.getItem('user')?.split(',');
        // Obtener la parte delante de la coma
        resultado = partes[1];
    }
    return (
 
        <div className="modalll">
            <div className="modal-contenttt">
                <h2 className='fw-bold fst-italic'>Operacion: {idComentario}</h2>
                <>
                
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                {/* <th scope="col">#</th> */}
                                <th scope="col">Comercial</th>
                                <th scope="col">Riesgo</th>
                                {/* <th scope="col">Formalizacion</th>
                                <th scope="col">PreFormalizacion</th> */}
                            </tr>
                        </thead>
                        {comentariosComercial.map((comentario, index) => (
                            <tbody>
                                <tr className='border'>
                                    {/* <th scope="row">1</th> */}
                                    <td className='border '>{comentario[0] ? comentario[0] : "Sin informacion"}</td>


                                    <td className='border'>{comentario[1] ? comentario[1] : "Sin informacion"}</td>
                                    {/* <td>{comentario[2]}</td>
                                    <td>{comentario[3]}</td> */}


                                </tr>
                                {/* <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr> */}
                            </tbody>))}
                    </table></>
                <hr />
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Formalizacion</th>
                            <th scope="col">PreFormalizacion</th>
                            {/* <th scope="col">Formalizacion</th>
                                <th scope="col">PreFormalizacion</th> */}
                        </tr>
                    </thead>
                    {comentariosComercial.map((comentario, index) => (
                        <tbody >
                            <tr className='border'>
                                {/* <th scope="row">1</th> */}
                                <td className='border'>{comentario[2] ? comentario[2] : "Sin informacion"}</td>


                                <td className='border'>{comentario[3] ? comentario[3] : "Sin informacion"}</td>
                                {/* <td>{comentario[2]}</td>
                                    <td>{comentario[3]}</td> */}


                            </tr>
                            {/* <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr> */}
                        </tbody>))}
                </table>
                <button onClick={() => navigate(-1)}>Volver</button>
                {/* <button onClick={handleCloseModal}>Continuar</button> */}
            </div>
        </div>
    )
}
