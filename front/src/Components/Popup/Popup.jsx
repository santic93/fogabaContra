import { useContext, useEffect, useState } from 'react';
import "./Popup.css"
import Context from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Popup({ datos, setDatos }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const { completeUsuarios, usuarios } = useContext(Context)
    const history = useNavigate();
    useEffect(() => {
        const data = async () => {
            await axios.get("/comerciales").then(res => res.data).then((res) => completeUsuarios(res)).catch((error) => console.log(error))
        }
        data()
    }, [])
    // Función para manejar la selección de usuario
    const handleUserSelection = (event) => {
        setSelectedUser(event.target.value);
    };

    // Función para cerrar el modal y continuar con la selección de usuario
    const handleCloseModal = () => {
        if (selectedUser) {

            localStorage.setItem('user', selectedUser)
            history('/consulta');
        } else {
            alert('Debes seleccionar un usuario antes de continuar.');
        }
    };
 
    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className='seleccion'>Selecciona tu usuario</h2>
                <br />
                <select
                    className="form-select"
                    aria-label="Seleccionar usuario"
                    onChange={handleUserSelection} // Maneja el cambio de selección
                    value={selectedUser} // Establece el valor seleccionado
                >
                    <option value="" >Selecciona un usuario</option>
                    {usuarios.map((user) => (
                        <option key={user[0]} value={user}>
                            {user[1]}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <button onClick={handleCloseModal}>Continuar</button>
            </div>
        </div>
    )
}
