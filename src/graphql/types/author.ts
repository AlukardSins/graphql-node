import { model, Schema } from 'mongoose';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { Book, BookType } from './book';

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Author = model('Author', AuthorSchema);

export const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return Book.find({ authorId: author.id });
      },
    },
  }),
});
