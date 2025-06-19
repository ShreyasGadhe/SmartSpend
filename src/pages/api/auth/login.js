import { prisma } from "../../../lib/prisma";
import { setToken } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  console.log("request body:", req.body);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log("EMAIL:", email, "PASSWORD:", password, "USER:", user);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid Credentials!" });
  }

  setToken(res, user.id);
  res.status(200).json({ message: "Login Successful!" });
}
