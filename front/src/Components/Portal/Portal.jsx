import goog from "./goog.png"
import face from "./face.png"
import git from "./provincia.svg"
import "./Portal.css"
import { useContext } from 'react'
import Context from '../../Context/Context'
import { Link } from 'react-router-dom'
export default function Portal() {
    const { precalificador, precalificar } = useContext(Context)
    console.log(precalificar)
    const websites = [
        // { name: "Google", url: "https://www.google.com", img: goog },
        // { name: "Facebook", url: "https://www.facebook.com", img: face },
        { name: "Provincia", url: "/consulta", img: git },
        // Agrega más sitios web aquí
    ];
    // onClick={() => precalificador(false)}
    return (
        <div> <div className="containerrrrr">
            <div className="portal">
                <img src="../../" alt="" />
                <ul className="website-list">
                    {websites.map((site, index) => (
                        <li key={index}>
                            <Link to={site.url} rel="noopener noreferrer" >
                                <img src={site.img} alt={site.name} />
                               
                               
                            </Link>
                            <p className='mt-2 fw-bolder'>Precalificador</p>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </div></div>
    )
}
