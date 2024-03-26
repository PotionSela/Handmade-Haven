//Logic to allow user to post a new project

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Dropzone from './Dropzone';
import { ADD_THOUGHT } from '../utils/mutations';
import '../components/Style/Home.css'

//Set all text boxes to blank to start
const ThoughtForm = () => {
  const [formState, setFormState] = useState({
    thoughtText: '',
    thoughtAuthor: '',
    image: '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  // Set up our mutation with an option to handle errors
  const [addThought, { error }] = useMutation(ADD_THOUGHT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
        await addThought ({
            variables: { ...formState },
        });

        setFormState({
            thoughtText: '',
            thoughtAuthor: '',
        });
        setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  //Function to pass users input into database
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setFormState({
        ...formState,
        [name]: value
      });
      setCharacterCount(value.length);
    } else if (name !== 'thoughtText') {
      setFormState({ ...formState, [name]: value});
    }
  }

  return (
    <div className="project rounded">
      <h3 className="card-header rounded-top">Add your latest project!</h3>
      <div className="inputPadding form-container">
      <div className="dropzone rounded card-header">
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <Dropzone
        formState={formState}
        setFormState={setFormState}
        />
        </div>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <textarea
            name="thoughtText"
            placeholder="Add details about your project here."
            value={formState.thoughtText}
            className="form-input w-100"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-9">
          <input
            name="thoughtAuthor"
            placeholder="Let us know who created this project!"
            value={formState.thoughtAuthor}
            className="form-input w-100"
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-lg-3">
          <button className="btn btn-secondary btn-block py-3 btn-outline-dark" type="submit">
            Add Project
          </button>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default ThoughtForm;
