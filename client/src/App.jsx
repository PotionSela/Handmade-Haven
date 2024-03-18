import './App.css'
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import { Outlet } from 'react-router-dom'

// import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

//Create middleware that will attach the JWT token to every request as an 'authorization' header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client = {client}>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </ApolloProvider>
  );
}

export default App
