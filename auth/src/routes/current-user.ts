import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.status(200).json({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.status(200).json({ currentUser: payload });
  } catch (err) {
    return res.status(200).json({ currentUser: null });
  }
});

export { router as currentUserRouter };
/*
Our React front end wont be able to decode the JWT
and extract user data. So when needed, it will query
this endpoint and if the cookie  is not set, it means 
user is not logged in. If cookie is present:
- check if JWT is valid
- extract info and send to front end
*/
