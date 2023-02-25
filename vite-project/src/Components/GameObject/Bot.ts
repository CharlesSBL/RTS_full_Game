import BotProps from "../../Types/PropsTypes/BotProps";
import randomNum from "../Functions/RandomFunc";
import Unit from "./Unit";

export default class Bot extends Unit {
  private unitSpeed: number;

  constructor(botProps: BotProps) {
    super(botProps.unitProps);
    this.unitSpeed = botProps.unitSpeed || 2;
  }

  public walkTo(position: { x: number; y: number }): void {
    const { x: currentX, y: currentY } = this.getUnitInfo();

    if (currentX === position.x && currentY === position.y) {
      return;
    }

    let newX = currentX + Math.sign(position.x - currentX) * this.unitSpeed;
    let newY = currentY + Math.sign(position.y - currentY) * this.unitSpeed;

    if (!this.collisionTest(newX, newY)) {
      this.setPosition(newX, newY);
    }
  }

  public randomWalk(): void {
    const { x: currentX, y: currentY } = this.getUnitInfo();
    const directions = [
      { x: currentX + this.unitSpeed, y: currentY },
      { x: currentX - this.unitSpeed, y: currentY },
      { x: currentX, y: currentY + this.unitSpeed },
      { x: currentX, y: currentY - this.unitSpeed },
    ];
    const randomDirection = directions[randomNum(4)];
    this.setPosition(randomDirection.x, randomDirection.y);
  }

  public berserk(): void {
    const { x: currentX, y: currentY } = this.getUnitInfo();
    const directions = [
      { x: currentX + 2, y: currentY },
      { x: currentX - 2, y: currentY },
      { x: currentX, y: currentY + 2 },
      { x: currentX, y: currentY - 2 },
    ];
    const randomDirection = directions[randomNum(4)];
    this.setPosition(randomDirection.x, randomDirection.y);
  }
}
