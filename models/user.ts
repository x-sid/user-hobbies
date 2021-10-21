import mongoose from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 100,
      required: true,
    },
    hobbies: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hobbies",
    },
  },
  { timestamps: true }
);

export default interface IUser extends mongoose.Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = mongoose.model<IUser>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
