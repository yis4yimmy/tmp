const Title = ({
  title,
  subtitle,
  date,
}: {
  title?: string;
  subtitle?: string;
  date?: string;
}) =>
  title ? (
    <div className="text-center py-12">
      <h1 className="font-display text-5xl sm:text-6xl mb-8 text-gray-700">
        {title}
      </h1>
      {subtitle && <h3>{subtitle}</h3>}
      {date && <h5>{date}</h5>}
    </div>
  ) : (
    <></>
  );

export default Title;
