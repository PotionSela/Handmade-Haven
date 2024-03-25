// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { REMOVE_THOUGHT, REMOVE_COMMENT } from '../utils/mutations';
import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  // Define the remove thought and remove comment mutations
  const [removeThought] = useMutation(REMOVE_THOUGHT);
  const [removeComment] = useMutation(REMOVE_COMMENT);

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  // Define function to handle thought removal
  const handleRemoveThought = async () => {
    try {
      // Execute remove thought mutation
      await removeThought({
        variables: { thoughtId: thought._id },
      });
      // Handle UI update after thought removal
      // For example, redirect user to home page
    } catch (error) {
      console.error('Error removing thought:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  // Define function to handle comment removal
  const handleRemoveComment = async (commentId) => {
    try {
      // Execute remove comment mutation
      await removeComment({
        variables: { thoughtId: thought._id, commentId },
      });
      // Handle UI update after comment removal
      // For example, update comment list
    } catch (error) {
      console.error('Error removing comment:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {thought.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {thought.thoughtText}
        </blockquote>
      </div>

      <div className="my-5">
         {/* Render the list of comments */}
        <CommentList comments={thought.comments} onRemoveComment={handleRemoveComment}/>
        {/* Render button to remove thought */}
        <button onClick={handleRemoveThought}>Remove Thought</button>
      </div>
      {/* Render comment form */}
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;