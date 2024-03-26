//Logic to display all thoughts from all users on dashboard page

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Style/Home.css'

const ThoughtList = ({ thoughts, title }) => {
    if (!thoughts.length) {
      return <h3>No Thoughts Yet</h3>;
    }
  
    return (
      <div>
        <h3>{title}</h3>
        {thoughts &&
          thoughts.map((thought) => (
            <div key={thought._id} className="card mb-3">
              {/* Made a spot for clicking on the posts */}
            <h4 className="card-header p-2 m-0">
              {thought.thoughtAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this thought on {thought.createdAt}
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
              Join the discussion on this thought.
            </Link>
            {thought.image && (
              <img
                src={`/images/${thought.image}`}
                className='image-container'
                alt="Thought Image"
              />
            )}
            </div>
          </div>
        ))}
    </div>
  );
};

ThoughtList.propTypes = {
  thoughts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      thoughtAuthor: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      thoughtText: PropTypes.string.isRequired,
      image: PropTypes.string, // Added image prop type
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default ThoughtList;