import HpBar from "./HpBar";

type Tone = "blue" | "green" | "red";

interface FighterProps {
  label: string;
  subtitle: string;
  tone: Tone;
  hp?: number;
  maxHp?: number;
  imageSrc: string;
}

export default function Fighter({
  label,
  subtitle,
  tone,
  hp,
  maxHp,
  imageSrc,
}: FighterProps) {
  const palette: Record<Tone, string> = {
    blue: "border-blue-400/60 bg-blue-950/70 text-blue-300",
    green: "border-emerald-400/60 bg-emerald-950/70 text-emerald-300",
    red: "border-red-400/70 bg-red-950/70 text-red-300",
  };

  const showHp = hp !== undefined && maxHp !== undefined;

  return (
    <article className="w-full max-w-47.5">
      <div
        className={`relative flex aspect-square items-center justify-center border-2 overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.35)] ${palette[tone]}`}>
        {tone === "red" && (
          <span
            className="absolute right-2 top-2 size-2 z-10 animate-pulse rounded-full bg-red-400"
            aria-hidden="true"
          />
        )}

        <img
          src={imageSrc}
          alt={label}
          className="w-full h-full object-cover pixelated"
        />

        <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 backdrop-blur-xs py-1 text-center">
          <p className="text-xs font-bold tracking-[0.2em]">{label}</p>
        </div>
      </div>

      {showHp && (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
            <span>HP</span>
            <span>{Math.round((hp / maxHp) * 100)}%</span>
          </div>
          <HpBar current={hp} max={maxHp} enemy={tone === "red"} />
        </div>
      )}
    </article>
  );
}
