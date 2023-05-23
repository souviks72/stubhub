import mongoose from "mongoose";

import { Password } from "../services/password";
// An interace that describes the properties
// needed to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface to describe properties of a User doc
// Mongo adds new fields, hence this is needed
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    /* We are transforming the json version of our Mongo Doc
       - Delete: password and __v fields
       - Transform _id to id
      This is done because Mongo has some unique fields. Each service
      may use its own language and a different Db. So our responses
      must be normalized always
    */
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;

        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    // if user changes email, then also this hook will be called
    // that is why we need to check if password is changed
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed); // in any Mongodb hook, this refers to the doc, hence no arrow func used
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
/*
Ts and Mongo donot work well together. Ts doesn't know what we pass into
new User() constructor and so we can pass in anything and Ts won't show any errors
That is why we describe the UserAttrs interface and use the buildUser() func to
make use of Ts
*/

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
