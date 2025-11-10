const Card = ({ icon, title, description, cta }) => {
  return (
    <div className="group flex flex-col gap-4 rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-body">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
      {cta && (
        <span className="text-sm font-semibold text-primary transition group-hover:text-secondary">{cta}</span>
      )}
    </div>
  );
};

export default Card;
