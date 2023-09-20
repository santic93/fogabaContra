import { useContext, useEffect, useState } from 'react';
import "./Popup.css"
import Context from '../../Context/Context';
export default function Popup({datos,setDatos}) {
    const [selectedUser, setSelectedUser] = useState(null);
    // const { completeUsuarios } = useContext(Context)
    useEffect(() => {

    })
    // Función para manejar la selección de usuario
    const handleUserSelection = (user) => {
        setSelectedUser(user);
    };

    // Función para cerrar el modal y continuar con la selección de usuario
    const handleCloseModal = () => {
        if (selectedUser) {
            // Aquí puedes realizar cualquier acción que desees con el usuario seleccionado
            // Por ejemplo, puedes almacenarlo en el estado global o en una cookie.
            // Luego, cierra el modal.
        } else {
            alert('Debes seleccionar un usuario antes de continuar.');
        }
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className='seleccion'>Selecciona tu usuario</h2>
                <br />
                <select class="form-select" aria-label="Default select example">
                    {datos}
                    <option selected></option>
                    <option onClick={() => handleUserSelection('Usuario 1')}>Usuario 1</option>
                    <option onClick={() => handleUserSelection('Usuario 2')}>Usuario 2</option>
                    <option onClick={() => handleUserSelection('Usuario 3')}>Usuario 3</option>
                </select >
                <br />
                <br />
                <button onClick={handleCloseModal}>Continuar</button>
            </div>
        </div>
    )
}
