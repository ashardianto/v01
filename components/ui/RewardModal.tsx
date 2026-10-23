interface RewardModalProps {
  onSelectReward: (type: "weapon" | "armor") => void;
}

export default function RewardModal({ onSelectReward }: RewardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border-2 border-yellow-500/80 p-6 max-w-lg w-full rounded-lg shadow-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-500 font-bold mb-1">
          VICTORY: BOSS DEFEATED
        </p>
        <h2 className="text-xl font-black tracking-wider text-white mb-4">
          CHOOSE REWARD
        </h2>
        <p className="text-xs text-neutral-400 mb-6">
          Choose one between weapon or armor to power up your character!
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Weapon */}
          <button
            onClick={() => onSelectReward("weapon")}
            className="flex flex-col items-center justify-center p-4 border border-emerald-500/50 bg-emerald-950/30 hover:bg-emerald-900/40 rounded transition-all group cursor-pointer">
            <span className="text-lg font-bold text-emerald-400 mb-1 group-hover:scale-105 transition-transform">
              ⚔️ Weapon Upgrade
            </span>
            <span className="text-[11px] text-neutral-300 text-center">
              <strong>+15 Attack</strong>
            </span>
          </button>

          {/* Armor */}
          <button
            onClick={() => onSelectReward("armor")}
            className="flex flex-col items-center justify-center p-4 border border-blue-500/50 bg-blue-950/30 hover:bg-blue-900/40 rounded transition-all group cursor-pointer">
            <span className="text-lg font-bold text-blue-400 mb-1 group-hover:scale-105 transition-transform">
              🛡️ Armor Upgrade
            </span>
            <span className="text-[11px] text-neutral-300 text-center">
              <strong>+5% Damage Reduction</strong>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
