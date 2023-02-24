export default class ClickOrderState {
  sign: number;
  position: { x: number; y: number };
  setClickOrder: (
    newSign: number,
    newPosition: {
      x: number;
      y: number;
    }
  ) => void;

  constructor() {
    this.sign = 0;
    this.position = { x: 0, y: 0 };

    this.setClickOrder = (
      newSign: number,
      newPosition: { x: number; y: number }
    ) => {
      this.sign = newSign;
      this.position = newPosition;
    };
  }
}
