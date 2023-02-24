// import Bot from "../GameObject/Bot";
import Unit from "../GameObject/Unit";
import RandomNum from "./RandomFunc";
import Warrior from "../GameObject/Warrior";
const canvas = document.getElementById("app") as HTMLCanvasElement;

// generuje arr botow
export function GenWarriors(
  myInfoArr: Unit[],
  num: number,
  AllWarriorsArr: Warrior[],
  army?: "redArmy" | "blueArmy"
) {
  if (num == 0) {
    return;
  }

  const lastId = myInfoArr.length;

  for (let i = 0; i < num; i++) {
    let colorSide: "redArmy" | "blueArmy" = RandomNum(2)
      ? "redArmy"
      : "blueArmy";
    let colorArmy = "";

    if (army) {
      colorSide = army;
    }

    if (colorSide == "redArmy") {
      colorArmy = `rgba( 200, 0, 0, 0.5  )`;
    } else {
      colorArmy = `rgba( 0, 200, 0, 0.5  )`;
    }

    let positionWarrior: { x: number; y: number };
    if (colorSide == "redArmy") {
      positionWarrior = {
        x: RandomNum(canvas.width / 2),
        y: RandomNum(canvas.height),
      };
    } else {
      positionWarrior = {
        x: RandomNum(canvas.width / 2) + canvas.width / 2,
        y: RandomNum(canvas.height),
      };
    }

    const newWarrior = new Warrior(
      {
        botProps: {
          unitProps: {
            blockProps: {
              // id for array filter
              idNumber: lastId + i,
              //   position
              position: {
                x: positionWarrior.x,
                y: positionWarrior.y,
              },
              size: 8,
              //   color
              color: colorArmy,
            },
            // setting array for collision logic
            infoArr: myInfoArr,
          },
          // setting speed of unit
          unitSpeed: 1,
        },
      },
      //   setting army side
      colorSide,
      AllWarriorsArr,
      RandomNum(10) + 5
    );
    myInfoArr.push(newWarrior);
    AllWarriorsArr.push(newWarrior);
  }
}
