import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  _id: String,
  title: String,
  text: String,
  image: String,
  strongUil: String
});

const Post = mongoose.model('Post', postSchema);
export default Post;
