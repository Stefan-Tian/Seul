import { getUserId } from "../utils";

const projects = (parent, args, context, info) => {
  const userId = getUserId(context);
  const where = args.filter
    ? {
        AND: [
          { owner: { id: userId } },
          {
            OR: [
              { name_contains: args.filter },
              { description_contains: args.filter }
            ]
          }
        ]
      }
    : { owner: { id: userId } };

  return context.db.query.projects(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    info
  );
};

const todos = (parent, args, context, info) => {
  const userId = getUserId(context);
  const where = args.filter
    ? {
        AND: [
          { owner: { id: userId } },
          {
            name_contains: args.filter
          }
        ]
      }
    : { owner: { id: userId } };

  return context.db.query.todoes(
    { where, skip: args.skip, first: args.first, orderBy: args.orderBy },
    info
  );
};

const project = (parent, { id }, context, info) =>
  context.db.query.project({ where: { id } }, info);

const todo = (parent, { id }, context, info) =>
  context.db.query.todo({ where: { id } }, info);

const currentUser = (parent, args, context, info) =>
  typeof context.request.session.userId !== "undefined";

export default {
  currentUser,
  projects,
  project,
  todos,
  todo
};
