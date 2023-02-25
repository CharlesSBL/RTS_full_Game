// ====================================================== Import statements
import "./style.scss";
import Unit from "./Components/GameObject/Unit";
import ClickOrderState from "./States/ClickOrderState";
import Warrior from "./Components/GameObject/Warrior";
import { ClickUnitFunctions } from "./Components/Functions/ClickUnitFunctions";
import { GenWarriors } from "./Components/Functions/GenWarriors";
import GameObject from "./Components/GameObject/GameObject";
const audio = new Audio();
audio.src = "../Audio/DesertSound.mp3";
const audio2 = new Audio();
audio2.src = "../Audio/Footsteps.mp3";

function turnAudio() {
  audio2.play();
  audio.play();
}

// ====================================================================== Start game
document.addEventListener("DOMContentLoaded", () => {
  // ============================================ Canvas setup
  const canvas = document.getElementById("app") as HTMLCanvasElement;
  // const testDiv = document.getElementById("test") as HTMLDivElement;
  // Move the canvas element using hardware acceleration

  const body = document.body as HTMLBodyElement;

  body.style.height = `${window.innerHeight * 3}px`;
  body.style.width = `${window.innerWidth * 2}px`;

  canvas.width = 750;
  canvas.height = 375;

  window.addEventListener("resize", () => {
    canvas.width = 750;
    canvas.height = 375;
  });

  // ============================================ p setup
  const pHeroes: HTMLElement | null = document.getElementById("heros");
  const pOrcs: HTMLElement | null = document.getElementById("orcs");

  // ===================================================================== Start Func
  const Start = () => {
    turnAudio();
    // ============================================ States
    // const myInfo = new MyInfoObj();
    const orderState = new ClickOrderState();

    // =========================================== Warriors
    const myInfoArr: Unit[] = [];
    const AllWarriorsArr: Warrior[] = [];

    // ============================================ image
    const image1 = new Image();

    image1.onload = () => {
      const image2 = new Image();

      // ===================================================================== images on load2
      image2.onload = () => {
        // ========================================== gen units
        GenWarriors(myInfoArr, 5, AllWarriorsArr, "blueArmy");
        GenWarriors(myInfoArr, 5, AllWarriorsArr, "redArmy");

        const myUnit = new GameObject("app");

        // =========================================== Events
        ClickUnitFunctions(
          orderState.setClickOrder,
          orderState,
          myInfoArr,
          AllWarriorsArr
        );

        let fps = 0;

        // ============================================================ Start animation loop.
        const animate: FrameRequestCallback = () => {
          fps++;

          if (fps == 1) {
            myUnit.clearCanvas();
            // ====================================== clearing frame

            // ================================= check army side numbers
            const orcs: Warrior[] = AllWarriorsArr.filter((item) => {
              return item.armySide == "redArmy";
            });
            const heroes: Warrior[] = AllWarriorsArr.filter((item) => {
              return item.armySide == "blueArmy";
            });

            if (pHeroes) {
              pHeroes.innerHTML = `${heroes.length}`;
            }
            if (pOrcs) {
              pOrcs.innerHTML = `${orcs.length}`;
            }

            // if (heroes.length == 0 || orcs.length == 0) {
            // }

            // ================================================ render units
            myInfoArr.forEach((item) => {
              const warrior = item as Warrior;
              if (warrior.armySide == "redArmy") {
                warrior.render(image2, warrior.getWarriorInfo().hp);
              } else {
                warrior.render(image1, warrior.getWarriorInfo().hp);
              }

              if (orderState.sign == 0) {
                warrior.randomWalk();
              } else {
                warrior.closestEnemy();
              }
            });

            fps = 0;
          }

          requestAnimationFrame(animate);
          // =======================================================
        };
        requestAnimationFrame(animate);
      };

      image2.src = "../Katan.png";
    };

    // ============================================ load image
    image1.src = "../Borg.png";
  };

  Start();
});
