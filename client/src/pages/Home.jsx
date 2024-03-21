import authService from '../utils/auth';
import ThoughtList from '../components/Thought'
import { useQuery } from '@apollo/client';
import { GET_THOUGHTS } from '../utils/queries';
import Dropzone from '../components/Dropzone';

export default function Header() {
// Use Apollo Client's useQuery hook to fetch thoughts data
const { loading, error, data } = useQuery(GET_THOUGHTS);
  
// Handle loading and error states
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
    

    return (
        <div>
            <Dropzone />
            {authService.loggedIn() ? (
                <>
                    <ThoughtList thoughts={data.thoughts} title="thoughts list"/>
                </>
            ) : (
                <>
                    <h3>Welcome to Handmade Haven!</h3>
                    <h4>A place for crafters to show off their work and learn from others.</h4>
                    <h4>Please login or signup to continue</h4>
                </>
            )}
        </div>
    )
}