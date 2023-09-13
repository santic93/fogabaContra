import { useContext } from 'react';
import './Consulta.css';
import fog from './fogaba.jpg';
import Context from '../../Context/Context';

export default function Consulta() {
  const { buscar } = useContext(Context);
  return (
    <div className='consulta'>
      {<img src={fog} alt='' className='fogaba'/>}
    </div>
  );
}
