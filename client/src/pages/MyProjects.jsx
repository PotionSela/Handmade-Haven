import { useQuery } from '@apollo/client';
import { GET_USER_THOUGHTS } from '../utils/queries';
import AuthService from '../utils/auth';

import AddThoughtForm from '../components/NewPost';
import MyThoughts from '../components/MyThoughts';

const MyProjects = () => { 

    const currentUser = AuthService.getUsername();

    const { loading, error, data } = useQuery(GET_USER_THOUGHTS, {
        variables: { username: currentUser },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { userThoughts } = data;

    return (
        <>
            <AddThoughtForm />
            <MyThoughts thoughts={userThoughts}/>
        </>
    );

}

export default MyProjects;