import { gql } from '@apollo/client';


export const GET_THOUGHTS = gql`
    query getThoughts {
        thoughts {
            image
            _id
            thoughtText
            thoughtAuthor
            createdAt
            comments {
                commentText
                commentAuthor
                createdAt
            }
        }
    }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const GET_USER_THOUGHTS = gql`
query GetUserThoughts($username: String) {
  userThoughts(username: $username) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
  }
}`