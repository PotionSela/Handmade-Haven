import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login ($email: String!, $password: String!) {
    login (email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser ($username: String!, $email: String!, $password: String!) {
    addUser (username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_THOUGHT = gql`
  mutation addThought ($thoughtText: String!, $thoughtAuthor: String!, $image: Upload) {
    addThought (thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor, image: $image) {  
      image
      thoughtText
      thoughtAuthor
    }
  }
`

export const UPDATE_THOUGHT = gql`
  mutation updateThought ($thoughtId: ID!, $thoughtText: String!, $image: Float) {
    updateThought (thoughtId: $thoughtId, thoughtText: $thoughtText, image: $image) {
      thoughtId
      thoughtText
      thoughtAuthor
    }
} 
`

export const ADD_COMMENT = gql`
  mutation addComment ($thoughtId: ID!, $commentText: String!, $commentAuthor: String!) {
    addComment (thoughtId: $thoughtId, commentText: $commentText, commentAuthor: $commentAuthor) {
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
`

export const REMOVE_THOUGHT = gql`
  mutation removeThought ($thoughtId: ID!) {
    removeThought (thoughtId: $thoughtId) {
      thoughtId
    }
  }
`

export const REMOVE_COMMENT = gql`
  mutation removeComment ($thoughtId: ID!, $commentId: ID!) {
    removeComment (thoughtId: $thoughtId, commentId: $commentId) {
      thoughtId
      commentId
    }
  }
`