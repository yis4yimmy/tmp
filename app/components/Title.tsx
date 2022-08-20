const Title = ({ title, subtitle }: { title?: string; subtitle?: string }) =>
  title ? (
    <div className="text-center py-12">
      <h1 className="font-display text-5xl sm:text-6xl mb-8 text-gray-700">
        {title}
      </h1>
      {subtitle && <h3>{subtitle}</h3>}
    </div>
  ) : (
    <></>
  );

export default Title;
