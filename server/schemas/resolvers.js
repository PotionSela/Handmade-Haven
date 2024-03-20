const { User, Thought } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const multer = require('multer');

// Multer configuration for handling the file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // To specify the destination directory for storing uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // To generate an unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// To create a Multer instance with the configured storage options
const upload = multer({ storage: storage});


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });


      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { input: { thoughtText, image } }) => {
      // Logic to handle image upload and save image data to the database
      const thought = await Thought.create({ thoughtText });

      // If image is provided, handle image upload and store image data
      if (image) {
        try {
          // Upload the image file using Multer middleware
          await upload.single('image')(req, res, function (err) {
            if (err) {
              // Handle any errors that might occur during file upload
              console.error('Error uploading file:', err);
              throw new Error('Error uploading file');
            } else {
              // Access the uploaded file details from the 'req.file'
              const uploadedImage = req.file;
              // Store the image URL or other relevant data in the thought object
              thought.imageURL = uploadedImage.path;
            }
          });
        } catch (err) {
          console.error('Error processing file upload:', err);
          throw new Error('Error processing file upload');
        }
      }
      return thought;
    },
    updateThought: async (parent, { input: { thoughtId, thoughtText, image } }) => {
      // Once the thought is created and saved in the database, it's time to update the thought
      // creator's thoughts array with the newly created thought ID
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { thoughtText },
        { new: true }
      );

      if (!thought) {
        throw new Error('Thought not found');
      }

      if (thoughtText) {
        thought.thoughtText = thoughtText;
      }

      // If image is provided, handle image upload and update image data
      if (image) {
        try {
          // Upload the image file using Multer middleware
          await upload.single('image')(req, res, function (err) {
            if (err) {
              // Handle any errors that occur during the file upload
              console.error('Error uploading file:', err);
              throw new Error('Error uploading file');
            } else {
              // To access the uploaded file details from the 'req.file'
              const uploadedImage = req.file;
              // Store the image URL or other relevant data in the thought object
              thought.imageUrl = uploadedImage.path;
            }
          });
        } catch (err) {
          console.error('Error processing file upload:', err);
          throw new Error('Error processing file upload');
        }
      }
      await thought.save();

      return thought;
    },
    addComment: async (parent, { thoughtId, commentText, commentAuthor }) => {
      // This is checking the thoughtId to comment on that specific data
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        throw new Error('Thought not found');
      }

      thought.comments.push({ commentText, commentAuthor });
      await thought.save();
      return thought;
    },
    removeThought: async (parent, { thoughtId }) => {
      const thought = await Thought.findOneAndDelete({ _id: thoughtId });
      if (!thought) {
        throw new Error('Thought not found! :(');
      }
      return thought;
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        throw new Error('Sorry thought not found!');
      }
      thought.comments = thought.comments.filter(comment => comment._id.toString() !== commentId);
      await thought.save();
      return thought;
    },
  },
};

module.exports = resolvers;