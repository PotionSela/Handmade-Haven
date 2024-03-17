import Auth from '../utils/auth';

const Header = () => {

}

return (
    {Auth.loggedIn() ? (
        <>

        </>
    ) : (
        <>
            <h3>Welcome to Handmade Haven!</h3>
            <h4>A place for crafters to show off their work and learn from others.</h4>
            <h4>Please login or signup to continue</h4>
        </>
    )}
)