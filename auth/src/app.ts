import express from "express";
import "express-async-errors"; //for handling async errors without next() or try-catch
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); //because app is proxied through Nginx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
// this will allow us to set JWT tokens(or other data) in the cookie
// in the sign up handle, after user.save() we store the
// JWT in the cookie, that is taken care of by this library
// once express sends res to browser, the cookie will be stored in it

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
}); //handle unknow routes

app.use(errorHandler);

export { app };
