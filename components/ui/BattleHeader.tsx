interface BattleHeaderProps {
  level: number;
  isBossLevel: boolean;
}

export default function BattleHeader({
  level,
  isBossLevel,
}: BattleHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-700 pb-4">
      <div className="flex w-full items-center justify-center">
        <h1 className="mt-1 items-center text-xl font-bold tracking-[0.3em] sm:text-2xl">
          LEVEL {level}
        </h1>
      </div>
      {isBossLevel && (
        <div className="border border-red-400/60 bg-red-950/40 px-3 py-2 text-right shadow-[3px_3px_0_rgba(127,29,29,0.35)]">
          <p className="text-[9px] tracking-[0.25em] text-red-300">
            [BOSS STAGE]
          </p>
          <p className="mt-1 text-[10px] text-red-500">ENCOUNTER BOSS</p>
        </div>
      )}
    </header>
  );
}
