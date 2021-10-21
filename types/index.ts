import mongoose from "mongoose";
export enum Hobbies {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "veryHigh",
}

export const { ObjectId } = mongoose.Types;
