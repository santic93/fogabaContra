import './Consulta.css';
import fog from './fogaba.jpg';
import provincia from "./descarga.png"

export default function Consulta() {
  return (
    <div className='consulta'>
    <div className='centered-container'>
      {/* <h3 className="mb-5 text-capitalize fst-italic fw-bold text-decoration-underline">Consulta Precalificacion</h3> */} 
        <img src={provincia} alt='' className='fogaba' />
      </div>
    </div>
  );
}
