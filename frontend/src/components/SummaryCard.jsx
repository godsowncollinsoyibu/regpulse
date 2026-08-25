const ACCENTS = {
  teal: "from-teal to-teal-dark",
  violet: "from-violet to-violet-light",
  coral: "from-coral to-coral-dark",
  amber: "from-amber to-orange-400",
};

export default function SummaryCard({ label, value, accent = "teal", icon: Icon }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${ACCENTS[accent]} opacity-10`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="mt-1 text-3xl font-display font-semibold text-ink">{value}</p>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${ACCENTS[accent]} text-white`}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
}
