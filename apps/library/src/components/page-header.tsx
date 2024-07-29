export const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
};
