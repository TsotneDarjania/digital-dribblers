import { useEffect, useRef } from "react";
import Phaser from "phaser";

import style from "./style.module.css";
import { Preload } from "./scenes/preload";
import { GamePlay } from "./scenes/gamePlay";

const Game = () => {
  const canvasContainer = useRef(null);
  useEffect(() => {
    if (!canvasContainer.current) return;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      backgroundColor: 0x104a1b,
      scene: [Preload, GamePlay],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer}></div>;
};

export default Game;
