import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import { RootQueryType } from './graphql/queries/root-queries';
import { RootMutationType } from './graphql/mutations/root-mutations';

import { DB_CONNECTION } from './utils/constants';

const app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

mongoose
  .connect(DB_CONNECTION)
  .then(() => console.log(`Connected to db located in ${DB_CONNECTION}`))
  .catch((e) => console.error("Can't connect to db", e));
app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(process.env.PORT ?? 4000, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
