import UnitProps from "../../Types/PropsTypes/UnitProps";
import Block, { UnitInfo as BlockUnitInfo } from "./Block";

export interface UnitInfo extends BlockUnitInfo {
  infoArr: Unit[];
}

export default class Unit extends Block {
  private infoArr: Unit[];

  constructor(unitProps: UnitProps) {
    super(unitProps.blockProps);
    this.infoArr = unitProps.infoArr;
  }

  public collisionTest(unitX: number, unitY: number): boolean {
    return this.infoArr.some((item) => {
      const {
        x: itemX,
        y: itemY,
        unitSize: itemSize,
        id: itemId,
      } = item.getUnitInfo();
      return (
        this.getUnitInfo().id !== itemId &&
        unitX < itemX + itemSize &&
        unitX + this.getUnitInfo().unitSize > itemX &&
        unitY < itemY + itemSize &&
        unitY + this.getUnitInfo().unitSize > itemY
      );
    });
  }

  public setPosition(x: number, y: number): void {
    const { canvas, ctx } = super.getUnitInfo();

    if (!ctx) {
      return;
    }

    if (this.collisionTest(x, y)) {
      return;
    }

    if (x > canvas.width || x < 0) {
      return;
    }

    if (y > canvas.height || y < 0) {
      return;
    }

    this.setXY(x, y);
  }

  public getUnitInfo(): UnitInfo {
    const baseInfo = super.getUnitInfo();
    const baseInfoExtend = { ...baseInfo, infoArr: this.infoArr };
    return {
      ...baseInfoExtend,
    };
  }
}
