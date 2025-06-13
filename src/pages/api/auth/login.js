import { FindUser } from "../../../lib/users";
import { setToken } from "../../../lib/auth";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  console.log("request body:", req.body);
  const user = FindUser(email, password);
  console.log("EMAIL:", email, "PASSWORD:", password, "USER:", user);

  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials!" });
  }

  const token = String(user.id);
  setToken(res, token);
  res.status(200).json({ message: "Login Successful!" });
}
