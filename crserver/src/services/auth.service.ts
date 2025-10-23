import axios from "axios";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { email } from "zod";
import { userService } from "./user.service";
dotenv.config();
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
  "postmessage"
);

export const authService = {
  googleLogin: async (req: Request, res: Response) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).send("no code was sent");
      }
      const { tokens } = await oAuth2Client.getToken(code);
      if (!tokens.access_token) {
        return res.status(400).send("faild to recive token");
      }
      const { data: userInfo } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );
      let user = await userService.checkExist(userInfo.email);
      if (!user) {
        user = await userService.createUser({
          email: userInfo.email,
          userName: userInfo.name,
        });
        if (!user) {
          return res.status(400).send("can create user");
        }
      }
      res.json({
        token: tokens.access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.userName,
          isAdmin: false,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
