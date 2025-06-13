import { getToken } from "../../../lib/auth";
import { users } from "../../../lib/users";

export function handler(req, res) {
  const token = getToken(req);
  if (!token) res.status(401).json({ message: "Unauthorised" });

  const user = users.find((user) => user.id === parseInt(token));
  res.status(200).json({ user });
}
