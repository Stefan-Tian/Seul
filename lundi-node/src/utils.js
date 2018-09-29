export const getUserId = context => {
  if (context.request.session.userId) {
    return context.request.session.userId;
  }

  throw new AuthError();
};

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}
