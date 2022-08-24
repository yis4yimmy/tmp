import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import defaultMeta from "./constants/default-meta";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Source+Serif+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  ...defaultMeta,
});

export default function App() {
  const today = new Date();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="container min-h-screen flex flex-col mx-auto px-4 font-body text-gray-900">
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-baseline mt-4 mb-6 gap-4">
          <NavLink
            className="font-heading font-bold text-3xl leading-loose"
            to="/"
          >
            Testing My Patience
          </NavLink>
          <nav className="font-heading text-lg flex gap-5">
            <NavLink className="hover:underline" to="/blog">
              Blog
            </NavLink>
            <NavLink className="hover:underline" to="/about">
              About
            </NavLink>
            <a
              className="hover:underline"
              href="https://github.com/yis4yimmy"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </nav>
        </header>
        <Outlet />
        <footer className="text-center pt-16 pb-12">
          <ul className="mt-3">
            <li className="px-3">
              <Link className="hover:underline" to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
          <p className="mt-3">{`All rights reserved ${today.getFullYear()}, Jim Schuster`}</p>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
