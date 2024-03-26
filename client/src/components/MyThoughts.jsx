// Logic for displaying current users thoughts on their projects page

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Style/Home.css'

const MyThoughts = ({ thoughts }) => {
  //Display none if no thoughts exist yet
  if (!Array.isArray(thoughts) || thoughts.length === 0) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {/* map out all thoughts and display the current users thoughts */}
      {thoughts.map((thought) => (      
      <div key={thought._id} className="card mb-3">
        {thought.title && <h3>{thought.title}</h3>}
            {/* Made a spot for clicking on the posts */}
            <h4 className="card-header p-2 m-0">
              <span style={{ fontSize: '1rem' }}>
                You had this thought on {thought.createdAt}
              </span>
            </h4>
            <div className="project">
              <div>
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-secondary btn-block btn-outline-dark"
              to={`/thoughts/${thought._id}`}
            >
              Click to see the discussion on this thought.
            </Link>
            {thought.image && (
              <div>
              <img
                src={`/images/${thought.image}`}
                className="image-container"
                alt="Thought Image"
              />
              </div>
            )}
          </div>
          </div>
        ))}
    </div>
  );
};

MyThoughts.propTypes = {
  thoughts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      thoughtAuthor: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      thoughtText: PropTypes.string.isRequired,
      image: PropTypes.string,
      title: PropTypes.string
    })
  ),
};

export default MyThoughts;