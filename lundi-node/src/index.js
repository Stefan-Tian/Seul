import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";
import session from "express-session";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import AuthPayload from "./resolvers/AuthPayload";

const resolvers = {
  Query,
  Mutation,
  AuthPayload
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "http://localhost:4466",
      secret: "mysecret123",
      debug: true
    })
  })
});

const SESSION_SECRET =
  "jkdjflajojj83193aQdj1foaj0oPjkj359fajrQjf42a;oOIMFdj3hfoahjbfDjererjojosrE";

server.express.use(
  session({
    name: "qid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 60 // 60 days
    }
  })
);

const cors = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:4000"]
};

server.start({ cors }, () =>
  console.log("Server is running on localhost:4000")
);
