import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { setToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return res.status(405).json({ message: "User already exists." });

    password = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    setToken(res, String(user.id));
    return res.status(201).json({ message: "Signup Successful" });
  } catch (error) {
    console.error("Signup error: " + error);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
