import mongoose from "mongoose";

const DOCUMENT_NAME = "Hobbies";
const COLLECTION_NAME = "hobbies";

const schema = new mongoose.Schema(
  {
    passionLevel: {
      type: String,
      enum: ["low", "medium", "high", "veryHigh"],
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export default interface IHobbies extends mongoose.Document {
  name: string;
  passionLevel: string;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Hobbies = mongoose.model<IHobbies>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
