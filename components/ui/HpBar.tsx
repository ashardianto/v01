export default function HpBar({
  current,
  max,
  enemy = false,
}: {
  current: number;
  max: number;
  enemy?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`${current} of ${max} HP remaining`}>
      <div className="h-2.5 flex-1 overflow-hidden border border-neutral-700 bg-neutral-950 p-px">
        <div
          className={`h-full transition-all duration-500 ${enemy ? "bg-red-500" : "bg-emerald-400"}`}
          style={{ width: `${(current / max) * 100}%` }}
        />
      </div>
      <span className="w-16 text-right text-[10px] text-neutral-400">
        {current}/{max}
      </span>
    </div>
  );
}
