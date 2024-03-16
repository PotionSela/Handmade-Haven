import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'

return (
    <main>
        <div></div>
    {Auth.loggedIn() ? (
        <>
            <h1>Welcome to Handmade Haven!</h1>
            <h3>A place for crafters to show off their work and learn from others.</h3>
            <h3>Please login or signup to continue.</h3>
        </>
    ) : (
        <>
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search Project</button>
    </form>
    
        </>
    )}
    </main>
)