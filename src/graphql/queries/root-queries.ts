import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from "graphql";

import { Author, AuthorType } from "../types/author";
import { Book, BookType } from "../types/book";

export const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    getBook: {
      type: BookType,
      description: "A Single Book",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Book.findById(args.id);
      },
    },
    getAllBooks: {
      type: new GraphQLList(BookType),
      description: "List of All Books",
      resolve: async () => {
        return await Book.find();
      },
    },
    getAuthor: {
      type: AuthorType,
      description: "A Single Author",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Author.findById(args.id);
      },
    },
    getAllAuthors: {
      type: new GraphQLList(AuthorType),
      description: "List of All Authors",
      resolve: async () => {
        return await Author.find();
      },
    },
  }),
});
