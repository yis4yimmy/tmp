import { createCookieSessionStorage, redirect, Session } from "@remix-run/node";

export const login = (password: FormDataEntryValue | null) => {
  const storedPassword = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Enter a password");
  }
  if (typeof password !== "string") {
    throw new Error("Invalid password");
  }
  if (!storedPassword) {
    throw new Error("Admin mode not configured correctly");
  }
  if (password !== storedPassword) {
    throw new Error("Invalid password");
  }

  return true;
};

const sessionSecret = (() => {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET must be set");
  }

  return secret;
})();

const storage = createCookieSessionStorage({
  cookie: {
    name: "admsess",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
    httpOnly: true,
  },
});

export const createAdminSession = async (redirectTo: string) => {
  const session = await storage.getSession();

  session.set("admin", "admin-session");

  return redirect(redirectTo, {
    headers: { "Set-Cookie": await storage.commitSession(session) },
  });
};

const getAdminSession = (request: Request) =>
  storage.getSession(request.headers.get("Cookie"));

const validToken = (token: Session | null) => {
  if (!token || token.data.admin !== "admin-session") {
    return false;
  }

  return true;
};

export const requireAdminLogin = async (request: Request) => {
  const adminToken = await getAdminSession(request);

  if (!validToken(adminToken)) {
    throw redirect("/admin");
  }
};

export const checkAdmin = async (request: Request) => {
  const adminToken = await getAdminSession(request);

  if (!validToken(adminToken)) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return true;
};
