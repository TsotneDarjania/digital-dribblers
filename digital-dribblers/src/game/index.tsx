import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";

import style from "./style.module.css";
import { GamePlay } from "./scenes/gamePlay";
import { Preload } from "./scenes/preload";
import { Menu } from "./scenes/menu";

const Game = () => {
  const canvasContainer = useRef(null);

  //@ts-ignore
  const IOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent); // fails on

  function isIOS() {
    return IOS ? true : false;
  }

  const isLandscapeOrientation = () => {
    if (isIOS()) {
      if (window.innerHeight > window.innerWidth) return false;
      else return true;
    } else {
      if (window.screen.height > window.screen.width) {
        return false;
      } else {
        return true;
      }
    }
  };

  const [isPortrait, setIsPortrait] = useState(
    isLandscapeOrientation() ? false : true
  );

  const hideWidth = window.outerWidth - window.innerWidth;
  const hideHeight = window.outerHeight - window.innerHeight;

  const getCanvasSize = () => {
    console.log(isIOS());
    if (isIOS()) {
      const canvasWidth = isLandscapeOrientation()
        ? window.innerWidth
        : window.innerHeight;
      const canvasHeight = isLandscapeOrientation()
        ? window.innerHeight
        : window.innerWidth;

      return [canvasWidth, canvasHeight];
    } else {
      const canvasWidth = isLandscapeOrientation()
        ? window.outerWidth - hideWidth
        : window.outerHeight - hideHeight;

      const canvasHeight = isLandscapeOrientation()
        ? window.outerHeight - hideHeight
        : window.outerWidth - hideWidth;

      return [canvasWidth, canvasHeight];
    }
  };

  window
    .matchMedia("(orientation: portrait)")
    .addEventListener("change", (e) => {
      const portrait = e.matches;

      if (portrait) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    });

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
      fullscreenTarget: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: getCanvasSize()[0],
        height: getCanvasSize()[1],
      },
      backgroundColor: 0x184047,
      scene: [Preload, Menu, GamePlay],
    });

    return () => game.destroy(true, false);
  }, []);

  return (
    <div ref={canvasContainer} className={style.canvasContainer}>
      {isPortrait && (
        <div className={style.orientationWarning}>
          <h1>please rotate your device to landscape </h1>
        </div>
      )}
    </div>
  );
};

export default Game;
