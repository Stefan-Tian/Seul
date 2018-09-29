import bcrypt from "bcryptjs";
import { getUserId } from "../utils";

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password }
    },
    `{ id }`
  );

  context.request.session.userId = user.id;
  console.log(context.db.query.currentUser);

  return {
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user(
    { where: { email: args.email } },
    ` { id password } `
  );

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  context.request.session.userId = user.id;

  return {
    user
  };
}

const logout = (parent, args, context, info) => {
  context.request.session.destroy(err => {
    if (err) {
      console.log(err);
    }
  });
};

const createTodo = (
  parent,
  { name, status, priority, startDate, endDate, projectId },
  context,
  info
) => {
  const userId = getUserId(context);
  return context.db.mutation.createTodo(
    {
      data: {
        name,
        status,
        priority,
        startDate,
        endDate,
        owner: { connect: { id: userId } },
        project: { connect: { id: projectId } }
      }
    },
    info
  );
};

const updateTodo = (
  parent,
  { name, status, priority, startDate, endDate, id },
  context,
  info
) => {
  return context.db.mutation.updateTodo(
    {
      data: {
        name,
        status,
        priority,
        startDate,
        endDate
      },
      where: {
        id
      }
    },
    info
  );
};

const deleteTodo = (parent, { id }, context, info) =>
  context.db.mutation.deleteTodo(
    {
      where: { id }
    },
    info
  );

const createProject = (parent, { name, description }, context, info) => {
  const userId = getUserId(context);
  return context.db.mutation.createProject(
    {
      data: {
        name,
        description,
        owner: { connect: { id: userId } }
      }
    },
    info
  );
};

const updateProject = (parent, { name, description, id }, context, info) => {
  return context.db.mutation.updateProject(
    {
      data: {
        name,
        description
      },
      where: {
        id
      }
    },
    info
  );
};

const deleteProject = (parent, { id }, context, info) =>
  context.db.mutation.deleteProject(
    {
      where: { id }
    },
    info
  );

const createMessage = (parent, { todoId, message }, context, info) =>
  context.db.mutation.createMessage(
    {
      data: {
        message,
        belongsTo: { connect: { id: todoId } }
      }
    },
    info
  );

export default {
  signup,
  login,
  logout,
  createTodo,
  updateTodo,
  deleteTodo,
  createProject,
  updateProject,
  deleteProject,
  createMessage
};
