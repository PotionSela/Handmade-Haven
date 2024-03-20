const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    createdAt: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: User!
    createdAt: String
    comments: [Comment]!
    imageId: ID
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: User!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]
    thought(thoughtId: ID!): Thought
    comments(thoughtId: ID!): [Comment]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, image: Float): Thought
    updateThought(thoughtId: ID!, thoughtText: String, image: Float): Thought
    addComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
    ): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
