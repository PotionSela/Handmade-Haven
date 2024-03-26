const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '2h';


module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    if (!token) {
      return req;
    }
//if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      console.error('Invalid Token:', error);
    }

    //return the request object so it can be passed to the resolver as 'context'
    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
