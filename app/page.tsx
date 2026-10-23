"use client";

import { useState } from "react";
import BattleHeader from "@/components/ui/BattleHeader";
import BattleArena from "@/components/ui/BattleArena";
import BattleFooter from "@/components/ui/BattleFooter";
import RewardModal from "@/components/ui/RewardModal";

export default function Page() {
  const [level, setLevel] = useState(1);

  // Tank status & bonus reward
  const maxTankHp = 500;
  const [tankHp, setTankHp] = useState(500);
  const [bonusTankDef, setBonusTankDef] = useState(0);
  const tankDef = 10 + bonusTankDef;

  // Damage dealer status & bonus reward
  const [bonusDealerAtk, setBonusDealerAtk] = useState(0);
  const playerFlatDamage = 50 + bonusDealerAtk;

  // Reward modal status
  const [isChoosingReward, setIsChoosingReward] = useState(false);

  // --- Level scaling ---
  const isBossLevel = level % 5 === 0;

  // Enemy hp scaling
  const baseEnemyMaxHp = 50 + (level - 1) * 12;
  // Boss hp scaling
  const enemyMaxHp = isBossLevel
    ? Math.round(baseEnemyMaxHp * 1.5)
    : baseEnemyMaxHp;

  // Enemy attack
  const enemyAtk = 40 + Math.floor((level - 1) / 2) * 4;

  // Enemy damage reduce
  const enemyDef = isBossLevel ? 6 : 4;
  // --------------------------------------

  const [enemyHp, setEnemyHp] = useState(enemyMaxHp);
  const [turn, setTurn] = useState<"PLAYER" | "ENEMY">("PLAYER");
  const [isGameOver, setIsGameOver] = useState(false);

  function attack() {
    if (turn !== "PLAYER" || enemyHp <= 0 || isGameOver || isChoosingReward)
      return;

    // Damage calculation
    const finalPlayerDamage = playerFlatDamage * (1 - enemyDef / 100);
    const nextEnemyHp = Math.max(
      0,
      Number((enemyHp - finalPlayerDamage).toFixed(2)),
    );
    setEnemyHp(nextEnemyHp);

    // Check win condition
    if (nextEnemyHp === 0) {
      const nextLevel = level + 1;

      if (isBossLevel) {
        setIsChoosingReward(true);
        return;
      }

      processNextLevel(nextLevel);
      return;
    }

    setTurn("ENEMY");

    // 2. Enemy turn
    setTimeout(() => {
      const finalTankDamage = enemyAtk * (1 - tankDef / 100);
      const nextTankHp = Math.max(
        0,
        Number((tankHp - finalTankDamage).toFixed(2)),
      );
      setTankHp(nextTankHp);

      if (nextTankHp === 0) {
        setIsGameOver(true);
        return;
      }
      setTurn("PLAYER");
    }, 800);
  }

  const processNextLevel = (targetLevel: number) => {
    const nextIsBoss = targetLevel % 5 === 0;
    const nextBaseHp = 50 + (targetLevel - 1) * 12;
    const nextEnemyMaxHp = nextIsBoss
      ? Math.round(nextBaseHp * 1.5)
      : nextBaseHp;

    setTimeout(() => {
      setLevel(targetLevel);
      setEnemyHp(nextEnemyMaxHp);
      setTankHp(maxTankHp);
      setTurn("PLAYER");
    }, 800);
  };

  // function processNextLevel(targetLevel: number) {
  //   const nextIsBoss = targetLevel % 5 === 0;
  //   const nextBaseHp = 50 + (targetLevel - 1) * 12;
  //   const nextEnemyMaxHp = nextIsBoss
  //     ? Math.round(nextBaseHp * 1.5)
  //     : nextBaseHp;

  //   setLog([`Ascending to Level ${targetLevel}...`, ...log].slice(0, 4));

  //   setTimeout(() => {
  //     setLevel(targetLevel);
  //     setEnemyHp(nextEnemyMaxHp);
  //     setTankHp(maxTankHp);
  //     setTurn("PLAYER");
  //   }, 800);
  // }

  function handleSelectReward(type: "weapon" | "armor") {
    if (type === "weapon") {
      setBonusDealerAtk((prev) => prev + 15);
    } else {
      setBonusTankDef((prev) => prev + 5);
    }

    setIsChoosingReward(false);
    processNextLevel(level + 1);
  }

  function reset() {
    setLevel(1);
    setTankHp(maxTankHp);
    setEnemyHp(50);
    setBonusDealerAtk(0);
    setBonusTankDef(0);
    setTurn("PLAYER");
    setIsGameOver(false);
    setIsChoosingReward(false);
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-5 text-neutral-900 sm:px-8 lg:px-12 relative">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col justify-between gap-5">
        <BattleHeader level={level} isBossLevel={isBossLevel} />

        <BattleArena
          dealerAtk={playerFlatDamage}
          tankHp={tankHp}
          maxTankHp={maxTankHp}
          tankDef={tankDef}
          enemyHp={enemyHp}
          maxEnemyHp={enemyMaxHp}
          enemyAtk={enemyAtk}
          enemyDef={enemyDef}
          isBossLevel={isBossLevel}
        />

        <BattleFooter
          turn={turn}
          enemyHp={enemyHp}
          isGameOver={isGameOver}
          onAttack={attack}
          onReset={reset}
        />
      </div>

      {isChoosingReward && <RewardModal onSelectReward={handleSelectReward} />}
    </main>
  );
}
