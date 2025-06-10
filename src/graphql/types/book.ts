import { model, Schema } from "mongoose";
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Author, AuthorType } from "./author";

const BookDBSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

export const Book = model("Book", BookDBSchema);

export const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return Author.findById(book.authorId);
      },
    },
  }),
});
