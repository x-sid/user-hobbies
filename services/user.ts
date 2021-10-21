import IUser, { User } from "../models/user";
import { validateInput } from "../utils/specValidator";
import { userCreateSchema } from "../validation-schema/user";
import { ObjectId } from "../types/";

export class UserService {
  public static async create(userInfo: IUser): Promise<IUser | null> {
    const validUserInfo = await validateInput(userCreateSchema, userInfo);
    return await User.create(validUserInfo);
  }

  public static async update(
    userInfo: IUser,
    userId: string
  ): Promise<IUser | boolean | null> {
    const validUserId = ObjectId.isValid(userId);
    if (!validUserId) return false;

    const validUserInfo = await validateInput(userCreateSchema, userInfo);

    return await User.findOneAndUpdate({ _id: userId }, validUserInfo, {
      new: true,
      upsert: true,
    });
  }

  public static async fetch(): Promise<IUser[] | []> {
    return await User.find().populate("hobbies").exec();
  }

  public static async delete(userId: string): Promise<any> {
    const validUserId = ObjectId.isValid(userId);
    if (!validUserId) return false;
    return await User.deleteOne({ _id: userId });
  }
}
