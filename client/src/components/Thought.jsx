import PropTypes from 'prop-types';

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
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {thought.thoughtAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this thought on {thought.createdAt}
                </span>
              </h4>
              <div className="card-body bg-light p-2">
                <p>{thought.thoughtText}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };

  ThoughtList.propTypes - {
    thoughts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            thoughtAuthor: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            thoughtText: PropTypes.string.isRequired,
          })
        ).isRequired,
        title: PropTypes.string.isRequired,
      };
  
  export default ThoughtList;
