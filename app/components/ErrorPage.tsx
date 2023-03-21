import Main from "./Main";

export default function ErrorPage({
  title,
  message,
}: {
  title: string;
  message?: string;
}) {
  return (
    <Main>
      <h1 className="font-display text-5xl sm:text-6xl mb-8 text-gray-700 text-center">
        {title}
      </h1>
      {message && <pre className="text-center">{message}</pre>}
    </Main>
  );
}
