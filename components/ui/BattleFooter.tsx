interface BattleFooterProps {
  turn: "PLAYER" | "ENEMY";
  enemyHp: number;
  onAttack: () => void;
  onReset: () => void;
}

export default function BattleFooter({
  turn,
  enemyHp,
  onAttack,
  onReset,
}: BattleFooterProps) {
  return (
    <footer className="flex items-end justify-between gap-4 border-t border-neutral-700 pt-4">
      <div className="flex items-center gap-4 sm:gap-7">
        <button
          type="button"
          onClick={onAttack}
          disabled={turn !== "PLAYER" || enemyHp === 0}
          className="border-2 border-yellow-400 bg-yellow-500 px-6 py-3 text-sm font-black tracking-[0.22em] text-neutral-950 shadow-[4px_4px_0_#713f12] transition hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:shadow-none sm:px-10 sm:py-4 sm:text-base">
          ATTACK
        </button>
        <div>
          <p className="text-[9px] tracking-[0.25em] text-neutral-500">TURN</p>
          <p
            className={`mt-1 text-xs font-bold tracking-widest ${turn === "PLAYER" ? "text-yellow-400" : "text-red-400"}`}>
            {turn === "PLAYER" ? "PLAYER TURN" : "ENEMY TURN"}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="border border-neutral-700 px-3 py-2 text-[10px] tracking-[0.2em] text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-200">
        RESET
      </button>
    </footer>
  );
}
