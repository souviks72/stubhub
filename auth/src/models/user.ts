import mongoose from "mongoose";

// An interace that describes the properties
// needed to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
