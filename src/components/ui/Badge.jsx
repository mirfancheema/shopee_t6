const variants = {
  mall:      'bg-primary text-white',
  verified:  'bg-secondary-fixed text-on-secondary-fixed',
  discount:  'bg-secondary-container text-on-secondary-container',
  preferred: 'bg-surface-tint text-white',
  guarantee: 'bg-tertiary text-on-tertiary',
};

export default function Badge({ type = 'mall', children, icon }) {
  return (
    <span className={`${variants[type]} text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider inline-flex items-center gap-0.5`}>
      {icon && <span className="material-symbols-outlined text-[10px]">{icon}</span>}
      {children}
    </span>
  );
}
