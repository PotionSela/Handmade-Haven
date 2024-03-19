import { Link } from 'react-router-dom';
import './Style/Header.css';


export default function  Header() {
    return(
        <header>
            <h1>Handmade Haven</h1>
            <nav>
                <div className="col-sm"></div>
            <div className="navbar-text">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link to='/'>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/signup'>Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/login'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/my-projects'>My Projects</Link>
                    </li>
                </ul>
                <div className="col-sm"></div>
            </div>
            </nav>
               
        </header>
    )
}
