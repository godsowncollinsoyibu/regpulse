const STYLES = {
  Pending: "bg-slate-100 text-slate-600 ring-slate-300",
  "In Progress": "bg-violet/10 text-violet ring-violet/30",
  Completed: "bg-teal/10 text-teal-dark ring-teal/30",
  Overdue: "bg-coral/10 text-coral-dark ring-coral/30",
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || STYLES.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
