import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "../errors/not-authorised-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //this miidle ware will be called after currentUser middleware is called
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
