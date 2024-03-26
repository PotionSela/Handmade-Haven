import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../components/Style/Home.css';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    if(data && data.login && data.login.token) {
      setIsLoggedIn(true);
    }
  }, [data]);

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="project rounded">
          <h4 className= "card-header rounded-top">Login</h4>
          <div>
            {isLoggedIn ? (
              <p>
                Success! You may now head{' '}
                <Link className="link" to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="inputPadding">
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div className="inputPadding">
                <input
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <button
                  className="btn btn-block btn-secondary btn-outline-dark"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
