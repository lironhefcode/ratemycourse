import { check, email } from "zod";
import { Users } from "./db.service";
import { userInfo } from "../moudles/userMoudle";

export const userService = {
  checkExist: async (email: string) => {
    const user = await Users.findOne({ email });
    return user || undefined;
  },
  createUser: async (data: Omit<userInfo, "_id" | "isAdmin">) => {
    let user = await userService.checkExist(data.email);
    if (!user) {
      user = new Users({
        ...data,
        isAdmin: false,
      });
      const res = await user.save();
      return res;
    }
  },
};
