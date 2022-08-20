import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

const useMDXComponent = (code: string) =>
  useMemo(() => getMDXComponent(code), [code]);

export default useMDXComponent;
