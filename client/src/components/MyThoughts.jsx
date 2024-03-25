import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MyThoughts = ({ thoughts, title, currentUser }) => {
    currentUser = currentUser.data.username
  if (!thoughts?.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  const currentUserThoughts = thoughts.filter(
    thought => thought.thoughtAuthor === currentUser
  );

  return (
    <div>
      <h3>{title}</h3>
      {currentUserThoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            {/* Made a spot for clicking on the posts */}
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <span style={{ fontSize: '1rem' }}>
                You had this thought on {thought.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Click to see the discussion on this thought.
            </Link>
            {thought.image && (
              <img
                src={`/images/${thought.image}`}
                style={{ maxWidth: '100%', height: 'auto' }} // Adjust sizing here
                alt="Thought Image"
              />
            )}
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
      image: PropTypes.string, // Added image prop type
    })
  ),
  title: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default MyThoughts;