import Fighter from "./Fighter";

interface BattleArenaProps {
  dealerAtk: number;
  tankHp: number;
  maxTankHp: number;
  tankDef: number;
  enemyHp: number;
  maxEnemyHp: number;
  enemyAtk: number;
  enemyDef: number;
  isBossLevel: boolean;
}

export default function BattleArena({
  dealerAtk,
  tankHp,
  maxTankHp,
  tankDef,
  enemyHp,
  maxEnemyHp,
  enemyAtk,
  enemyDef,
  isBossLevel,
}: BattleArenaProps) {
  return (
    <section
      aria-label="Battlefield"
      className="flex flex-1 items-center justify-center border border-neutral-800 bg-neutral-100 px-4 py-6 sm:px-8 lg:px-14">
      <div className="flex w-full max-w-4xl items-center justify-between gap-3 sm:gap-8">
        <div className="grid w-[42%] grid-cols-2 gap-3 sm:gap-6">
          {/* Mage / Damage Dealer */}
          <div className="flex flex-col">
            <Fighter
              label="MAGE"
              subtitle="Dealer"
              tone="green"
              imageSrc="assets/img/invoker.jpeg"
            />
            <div className="mt-2 text-[10px] text-neutral-400 text-center bg-neutral-900 border border-neutral-800 py-1">
              ATK: {dealerAtk}
            </div>
          </div>

          {/* Tank */}
          <div className="flex flex-col">
            <Fighter
              label="TANK"
              subtitle="Tanker"
              tone="blue"
              hp={tankHp}
              maxHp={maxTankHp}
              imageSrc="/assets/img/mars.jpeg"
            />
            <div className="mt-2 text-[10px] text-neutral-400 text-center bg-neutral-900 border border-neutral-800 py-1">
              DEF: {tankDef}% Red.
            </div>
          </div>
        </div>

        <div className="shrink-0 text-center">
          <span className="block text-2xl font-bold tracking-widest text-neutral-600 sm:text-4xl">
            VS
          </span>
          <span className="mt-2 block text-[9px] tracking-[0.3em] text-neutral-700">
            BATTLE
          </span>
        </div>

        {/* Monster / Boss  */}
        <div className="flex w-[26%] flex-col">
          <Fighter
            label={enemyHp === 0 ? "DOWN" : isBossLevel ? "BOSS" : "ENEMY"}
            subtitle={isBossLevel ? "Void Warden" : "Wild Beast"}
            tone="red"
            hp={enemyHp}
            maxHp={maxEnemyHp}
            imageSrc={
              isBossLevel ? "/assets/img/roshan.png" : "/assets/img/creep.jpg"
            } // Berubah dinamis sesuai stage
          />
          <div className="mt-2 flex justify-between text-[10px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1">
            <span>ATK: {enemyAtk}</span>
            <span>DEF: {enemyDef}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
