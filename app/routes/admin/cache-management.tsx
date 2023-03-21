import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Main from "../../components/Main";
import Table, { TableColumn } from "../../components/Table";
import Title from "../../components/Title";
import { getAllKeys, dropItLikeItsHot } from "../../utilities/cache.server";
import { checkAdmin, requireAdminLogin } from "../../utilities/session.server";

interface CacheKeysData {
  id: string;
  path: string;
}

export async function loader({ request }: LoaderArgs) {
  await requireAdminLogin(request);

  const keys = getAllKeys();

  const data = keys.map((path) => ({ id: path, path }));

  return json(data);
}

export async function action({ request }: ActionArgs) {
  await checkAdmin(request);

  const formData = await request.formData();

  const keyToRemove = formData.get("path");

  if (!keyToRemove) {
    throw new Error("No key was set");
  } else if (typeof keyToRemove !== "string") {
    throw new Error("Key provided is not a valid string");
  }

  const result = dropItLikeItsHot(keyToRemove);

  return json({ success: result });
}

const columns: TableColumn<CacheKeysData>[] = [
  {
    id: "path",
    label: "GitHub Path",
    render: ({ path }) => <code>{path}</code>,
  },
  {
    id: "action",
    label: "Action",
    render: ({ path }) => (
      <form method="post">
        <input type="hidden" id="path" name="path" value={path} />
        <button
          className="bg-red-700 border-2 border-red-700 border-b-red-900 rounded-md text-white px-6 py-2 transition-colors duration-200 ease-in-out hover:bg-red-900 hover:border-red-900 hover:border-t-red-700"
          type="submit"
        >
          Bust
        </button>
      </form>
    ),
  },
];

const CacheManagement = () => {
  const currentCacheData = useLoaderData<typeof loader>();

  return (
    <Main>
      <Title title="Cache Management" />
      <Table columns={columns} data={currentCacheData} />
    </Main>
  );
};

export default CacheManagement;
