import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email muse valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // console.log("Email in use");
      // return res.send({});
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // Ts was throwing an error as this can be string or undefined(if we forget to add Key)
      // if key is undefined, we will know it only after deployment. So best to check in index.ts start()
      // ! means we are telling Ts that the check is done, dont worry
    );
    // Store  it on session object
    req.session = {
      //enabled by cookieSession library
      jwt: userJwt,
    };
    return res.status(201).send(user);
  }
);

export { router as signupRouter };
