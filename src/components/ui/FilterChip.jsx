export default function FilterChip({ label, selected = false, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-label-sm whitespace-nowrap transition-colors active:scale-95 ${
        selected
          ? 'border-primary text-primary bg-primary-fixed'
          : 'border-surface-variant bg-surface-container-lowest text-on-surface-variant'
      }`}
    >
      {icon && (
        <span className="material-symbols-outlined text-[16px]">{icon}</span>
      )}
      {label}
    </button>
  );
}
