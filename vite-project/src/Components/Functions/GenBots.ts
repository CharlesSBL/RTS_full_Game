import Bot from "../GameObject/Bot";
import RandomNum from "./RandomFunc";
import Unit from "../GameObject/Unit";
const canvas = document.getElementById("app") as HTMLCanvasElement;

// generuje arr botow
export function genBots(
  num: number,
  setInfoArrs: (MyInfoArr: Unit[], MyinfoBotArr: Bot[]) => void
) {
  let myInfoArr: Unit[] = [];
  let myinfoBotArr: Bot[] = [];

  for (let i = 0; i < num; i++) {
    myinfoBotArr[i] = new Bot({
      unitProps: {
        blockProps: {
          idNumber: i + 1,
          position: {
            x: RandomNum(canvas.width),
            y: RandomNum(canvas.height),
          },
          size: RandomNum(20) + 10,
          color: `rgba( ${RandomNum(200)}, ${RandomNum(200)}, ${RandomNum(
            200
          )}, ${Math.random() + 1}  )`,
        },
        infoArr: myInfoArr,
      },
      unitSpeed: RandomNum(2),
    });
    myInfoArr[i] = myinfoBotArr[i];
  }

  setInfoArrs(myInfoArr, myinfoBotArr);
}
