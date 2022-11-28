import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import mercurius, { IResolvers } from 'mercurius';
import mercuriusCodegen, { gql } from 'mercurius-codegen';
import mongoose from 'mongoose';

export const app = Fastify();

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module 'mercurius' {
  interface MercuriusContext extends PromiseType<ReturnType<typeof buildContext>> {}
}

const schema = gql`
  type Query {
    post(_id: String!): Post!
    posts: [Post]!
  }

  type Mutation {
    createPost(data: CreatePostInput!): Post!
  }

  type Post {
    _id: String!
    title: String!
    text: String!
    image: String!
    strongUil: String!
  }

  input CreatePostInput {
    _id: String
    title: String!
    text: String!
    image: String!
    strongUil: String!
  }
`;

const postSchema = new mongoose.Schema({
  id: String!,
  title: String!,
  text: String!,
  image: String!,
  strongUil: String!,
});

const Post = mongoose.model('Post', postSchema);

const resolvers: IResolvers = {
  Query: {
    posts: async (_, obj) => {
      const posts = await Post.find({});
      return posts;
    },
    post: async (_, obj) => {
      const { id } = obj;
      const post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    createPost: async (_, { data }) => {
      const newPost = new Post(data);
      const post = await newPost.save();
      return post;
    },
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  context: buildContext,
});

if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  mercuriusCodegen(app, {
    targetPath: './src/graphql/generated.ts',
  }).catch(console.error);
}
