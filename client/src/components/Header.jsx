import { Link } from 'react-router-dom';



export default function  Header() {
    return(
        <header>
            <h1>Handmade Haven</h1>
                <nav>
                    <Link to='/'>Dashboard</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link>
                    <Link to='/my-projects'>My Projects</Link>
                </nav>
        </header>
    )
}
