import IHobbies, { Hobbies } from "../models/hobbies";
import { User } from "../models/user";
import { validateInput } from "../utils/specValidator";
import { createHobbiesSchema } from "../validation-schema/hobbies";
import { ObjectId } from "../types/";

export class HobbiesService {
  public static async create(
    hobbiesData: IHobbies,
    userId: string
  ): Promise<IHobbies | boolean | null> {
    const validUserId = ObjectId.isValid(userId);
    if (!validUserId) return false;

    const validHobbies = await validateInput(createHobbiesSchema, hobbiesData);
    const newHobby = await Hobbies.create(validHobbies);

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        hobbies: newHobby._id,
      },
      { new: true }
    );

    return newHobby;
  }

  public static async update(
    hobbyInfo: IHobbies,
    hobbyId: string
  ): Promise<IHobbies | boolean> {

    const validHobbyId = ObjectId.isValid(hobbyId);
    if (!validHobbyId) return false;

    const validUserInfo = await validateInput(createHobbiesSchema, hobbyInfo);
    return await Hobbies.findOneAndUpdate({ _id: hobbyId }, validUserInfo, {
      new: true,
      upsert: true,
    });
  }

  public static async delete(hobbyId: string, userId: string): Promise<any> {
    const validHobbyId = ObjectId.isValid(hobbyId);
    const validUserId = ObjectId.isValid(userId);

    if (!validHobbyId || !validUserId) return false;

    const [deleted, _] = await Promise.all([
      await Hobbies.deleteOne({ _id: hobbyId }),
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          hobbies: null,
        },
        { new: true }
      ),
    ]);

    return deleted;
  }
}
