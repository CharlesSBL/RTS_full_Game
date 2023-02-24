import ClickOrderState from "../../States/ClickOrderState";
import Unit from "../GameObject/Unit";
import Warrior from "../GameObject/Warrior";
import { GenWarriors } from "./GenWarriors";

const btnFight = document.getElementById("btnFight") as HTMLButtonElement;
const btnStop = document.getElementById("btnStop") as HTMLButtonElement;
const btnPlus = document.getElementById("btnPlus") as HTMLButtonElement;
const btnMinus = document.getElementById("btnMinus") as HTMLButtonElement;

const canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.style.transform = "scale(1)";

const numOrc = document.getElementById("numOrc") as HTMLInputElement;
const numHero = document.getElementById("numHero") as HTMLInputElement;
const btnGen = document.getElementById("btnGen") as HTMLButtonElement;
numOrc.value = "10";
numHero.value = "10";

const audio4 = new Audio();
audio4.src = "../Audio/btnSound.mp3";

const elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}

export function ClickUnitFunctions(
  callBack: (newSign: number, newPosition: { x: number; y: number }) => void,
  oldPosition: ClickOrderState,
  myInfoArr: Unit[],
  AllWarriorsArr: Warrior[]
  // myUnit?: Unit
) {
  // const speed = 10;
  // if (myUnit) {
  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     const { x: xUnit, y: yUnit } = myUnit.getUnitInfo();

  //     switch (e.key) {
  //       case "w":
  //         myUnit.setPosition(xUnit, yUnit - speed);
  //         break;
  //       case "s":
  //         myUnit.setPosition(xUnit, yUnit + speed);
  //         break;
  //       case "a":
  //         myUnit.setPosition(xUnit - speed, yUnit);
  //         break;
  //       case "d":
  //         myUnit.setPosition(xUnit + speed, yUnit);
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // }

  window.addEventListener("click", () => {
    openFullscreen();
  });

  const handleStopClick = (e: MouseEvent) => {
    const position = { x: e.clientX, y: e.clientY };
    const sign = 0;
    callBack(sign, position);
    oldPosition.sign = sign;
    // audio5.pause();
  };

  let number = 2;
  canvas.style.transform = "scale(2)";
  const handlePlusClick = () => {
    canvas.style.transform = `scale(${(number += 0.2)})`;
  };
  const handleMinusClick = () => {
    canvas.style.transform = `scale(${(number -= 0.2)})`;
  };

  const handleGenClick = (e: MouseEvent) => {
    e.preventDefault();
    AllWarriorsArr.length = 0;
    myInfoArr.length = 0;
    // console.log(numHero.value);
    GenWarriors(myInfoArr, Number(numHero.value), AllWarriorsArr, "blueArmy");
    GenWarriors(myInfoArr, Number(numOrc.value), AllWarriorsArr, "redArmy");
    console.log(AllWarriorsArr);
  };

  const handleFightClick = (e: MouseEvent) => {
    const position = { x: e.clientX, y: e.clientY };
    const sign = 1;
    callBack(sign, position);
    oldPosition.sign = sign;

    (() => {
      // audio5.play();
      // audio6.play();
      // audio7.play();
    })();
  };

  btnFight.addEventListener("click", handleFightClick);
  btnStop.addEventListener("click", handleStopClick);
  btnPlus.addEventListener("click", handlePlusClick);
  btnMinus.addEventListener("click", handleMinusClick);
  btnGen.addEventListener("click", handleGenClick);

  btnGen.addEventListener("mouseenter", () => {
    (() => {
      audio4.play();
    })();
  });
  btnFight.addEventListener("mouseenter", () => {
    (() => {
      audio4.play();
    })();
  });

  return () => {
    // window.removeEventListener("keypress", handleKeyPress);
    // window.removeEventListener("click", handleMouseClick);
  };
}
