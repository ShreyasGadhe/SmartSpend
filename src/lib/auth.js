import { serialize } from "cookie";

const COOKIE_NAME = "token";
const MAX_AGE = 60 * 60 * 5;

export function setToken(res, token) {
  const cookie = serialize(COOKIE_NAME, token, {
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
  res.setHeader("set-cookie", cookie);
}

export function removeToken(res) {
  const cookie = serialize(COOKIE_NAME, "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("set-cookie", cookie);
}

export function getToken(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;
  const token = cookies
    .split(";")
    .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  return token ? token.split("=")[1] : null;
}
