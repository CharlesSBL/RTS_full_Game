import Bot from "../Components/GameObject/Bot";
import Unit from "../Components/GameObject/Unit";

export default class MyInfoState {
  myInfoArr: Unit[];
  myinfoBotArr: Bot[];
  setInfoArrs: (MyInfoArr: Unit[], MyinfoBotArr: Bot[]) => void;

  constructor() {
    this.myInfoArr = [];
    this.myinfoBotArr = [];

    this.setInfoArrs = (MyInfoArr: Unit[], MyinfoBotArr: Bot[]) => {
      this.myInfoArr = MyInfoArr;
      this.myinfoBotArr = MyinfoBotArr;
    };
  }
}
