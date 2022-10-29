import { ActionFunction } from "@remix-run/node";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { createAdminSession, login } from "../../utilities/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const password = formData.get("password");

  const validCreds = login(password);

  if (validCreds) {
    return createAdminSession("/admin/cache-management");
  }
};

const Admin = () => {
  return (
    <Main>
      <Title title="Admin Stuff" subtitle="Nothing to see here 🙉 🙈 🙊" />
      <form method="post" action="/admin?index">
        <label id="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*****"
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </Main>
  );
};

export default Admin;
