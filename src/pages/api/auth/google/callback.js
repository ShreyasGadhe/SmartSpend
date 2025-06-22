import { setToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    res.status(405).send("code missing");
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-type": "application/x-www-from-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      grant_type: "authorization_code",
    }),
  });
  const tokenData = await tokenRes.json();
  const { access_token, id_token } = tokenData;
  const userInfo = jwt.decode(id_token); //(email, name, picture, subscription)
  console.log(userInfo);
  let user = prisma.user.findUnique({
    where: { email: userInfo.email },
  });

  if (!user) {
    prisma.user.create({
      data: {
        email: userInfo.email,
        name: userInfo.name,
        password: "",
      },
    });
  }

  setToken(res, String(user.id));
  res.redirect("/dashboard");
}
