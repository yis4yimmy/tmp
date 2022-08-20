const Title = ({ title }: { title?: string }) =>
  title ? (
    <h1 className="font-display text-4xl sm:text-6xl text-center py-12">
      {title}
    </h1>
  ) : (
    <></>
  );

export default Title;
