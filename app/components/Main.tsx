import type { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => (
  <main className="max-w-3xl mx-auto">{children}</main>
);

export default Main;
