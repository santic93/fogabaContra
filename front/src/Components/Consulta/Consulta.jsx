import './Consulta.css';
import fog from './fogaba.jpg';
import provincia from "./descarga.png"

export default function Consulta() {
  return (
    <div className='consulta'>
      <div className='centered-container'>
        <img src={provincia} alt='' className='fogaba' />
      </div>
    </div>
  );
}
