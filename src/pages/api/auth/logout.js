import { removeToken } from "@/lib/auth";

export function handler(req, res) {
  removeToken(res);
  res.status(200).json({ message: "Logged Out!" });
}
