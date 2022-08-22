import type { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => (
  <main className="max-w-2xl flex-grow mx-auto">{children}</main>
);

export default Main;
