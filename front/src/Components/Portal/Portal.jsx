import git from "./provincia.svg"
import fogaba from "./fogaba-acerca.png"
import "./Portal.css"
import { useContext } from 'react'
import Context from '../../Context/Context'
import { Link } from 'react-router-dom'

export default function Portal() {
    const websites = [
        { name: "Operaciones en Analisis", url: "/operaciones", img: fogaba },
        { name: "Precalificador", url: "/consulta", img: git },
       
    ];
    return (
        <div> <div className="containerrrrr">
            <div className="portal">
                <img src="../../" alt="" />
                <ul className="website-list">
                    {websites.map((site, index) => (
                        <div>
                            <li key={index}>
                                <Link to={site.url} rel="noopener noreferrer" >
                                    <img src={site.img} alt={site.name} />
                                </Link>
                                <p className='mt-2 fw-bolder text-center'>{site.name}</p>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div></div>
    )
}
