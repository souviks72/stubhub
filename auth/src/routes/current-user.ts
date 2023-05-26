import express, { Request, Response } from "express";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
/*
Our React front end wont be able to decode the JWT
and extract user data. So when needed, it will query
this endpoint and if the cookie  is not set, it means 
user is not logged in. If cookie is present:
- check if JWT is valid
- extract info and send to front end
*/
