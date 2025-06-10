import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import mongoose from 'mongoose';

import { Author, AuthorType } from '../types/author';
import { Book, BookType } from '../types/book';

export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (!args.name || typeof args.name !== 'string' || args.name.trim() === '') {
          throw new Error('Book name is required and must be a non-empty string.');
        }
        if (!mongoose.Types.ObjectId.isValid(args.authorId)) {
          throw new Error('Invalid authorId format.');
        }

        const newBook = new Book({
          name: args.name,
          authorId: args.authorId,
        });

        return await newBook.save();
      },
    },
    deleteBook: {
      type: BookType,
      description: 'Delete a Book',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          throw new Error('Invalid book id format.');
        }
        const deletedBook = await Book.findByIdAndDelete(args.id);
        if (!deletedBook) {
          throw new Error('Book not found.');
        }
        return deletedBook;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (!args.name || typeof args.name !== 'string' || args.name.trim() === '') {
          throw new Error('Author name is required and must be a non-empty string.');
        }
        const newAuthor = new Author({
          name: args.name,
        });
        return await newAuthor.save();
      },
    },
    deleteAuthor: {
      type: AuthorType,
      description: 'Delete a Author',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          throw new Error('Invalid author id format.');
        }
        const deletedAuthor = await Author.findByIdAndDelete(args.id);
        if (!deletedAuthor) {
          throw new Error('Author not found.');
        }
        return deletedAuthor;
      },
    },
  }),
});
