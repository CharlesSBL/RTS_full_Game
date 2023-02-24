// ====================================================== Import statements
import "./style.scss";
import Unit from "./Components/GameObject/Unit";
import ClickOrderState from "./States/ClickOrderState";
import Warrior from "./Components/GameObject/Warrior";
import { ClickUnitFunctions } from "./Components/Functions/ClickUnitFunctions";
import { GenWarriors } from "./Components/Functions/GenWarriors";
import GameObject from "./Components/GameObject/GameObject";

const audio = new Audio();
audio.src = "./Assets/Audio/DesertSound.mp3";
const audio2 = new Audio();
audio2.src = "./Assets/Audio/Footsteps.mp3";

function turnAudio() {
  audio2.play();
  audio.play();
}

// ====================================================================== Start game
document.addEventListener("DOMContentLoaded", () => {
  // ============================================ Canvas setup
  const canvas = document.getElementById("app") as HTMLCanvasElement;
  canvas.width = window.innerWidth / 4;
  canvas.height = window.innerHeight / 4;
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth / 4;
    canvas.height = window.innerHeight / 4;
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

        // ============================================================ Start animation loop.
        const animate: FrameRequestCallback = () => {
          // ====================================== clearing frame
          myUnit.clearCanvas();

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

          if (heroes.length == 0 || orcs.length == 0) {
            // if (heroes.length == 0) {
            // alert("HEROES HAS BEEN DEFEATED!!!");
            // return;
            // } else {
            // alert("ORCS HAS BEEN DEFEATED!!!");
            // return;
            // }
          }

          // ================================================ render units
          myInfoArr.forEach((item) => {
            const warrior = item as Warrior;
            if (warrior.armySide == "redArmy") {
              warrior.render(image2);
            } else {
              warrior.render(image1);
            }

            if (orderState.sign == 0) {
              warrior.randomWalk();
            } else {
              warrior.closestEnemy();
            }
          });
          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      };

      image2.src = "../public/Katan.png";
    };

    // ============================================ load image
    image1.src = "../public/Borg.png";
  };

  Start();
});
