import Bot from "./Bot";
import BotProps from "../../Types/PropsTypes/BotProps";

type ArmySide = "redArmy" | "blueArmy";

function delUndefined<T>(arr: (T | undefined)[]): T[] {
  return arr.filter((item): item is T => item !== undefined);
}

export default class Warrior extends Bot {
  private lvl = 1;
  private hp = 100;
  private dmg = 10;
  private armor = 5;
  private noTarget = false;
  armySide: ArmySide;
  private allWarriors: Warrior[] = [];
  private enemyArr: Warrior[] = [];
  // private enemyOdleglosc?: number;
  private enemy?: Warrior;

  constructor(
    { botProps }: { botProps: BotProps },
    armySide: ArmySide,
    allWarriors: Warrior[],
    lvl?: number
  ) {
    super(botProps);
    this.armySide = armySide;
    this.allWarriors = allWarriors;
    if (lvl) {
      this.setLevelStats(lvl);
    }
  }

  private isDead() {
    return this.hp <= 0;
  }

  private setLevelStats(lvl: number) {
    this.hp *= lvl;
    this.dmg *= lvl;
    this.armor *= lvl;
    this.lvl = lvl;
  }

  // filtruje array wszystkich warriors i znajduje unity przeciwnej armi
  // i je zapisuje do enemyArr
  private findEnemies(): Warrior[] {
    // if the unit is dead, do nothing
    if (this.isDead()) {
      return [];
    }

    // filter out enemies from the array of all warriors
    return this.allWarriors.filter(
      (warrior) => warrior.armySide !== this.armySide
    );
  }

  // metoda ukazuje statystyki unita
  public getWarriorInfo() {
    return { lvl: this.lvl, hp: this.hp, dmg: this.dmg, armor: this.armor };
  }

  // sprawdza czy jest nadal zywy, jesli jest, to ma isc dalej
  // jesli nie jest zywy to ma siebie usunac
  private die() {
    if (this.isDead()) {
      this.getUnitInfo().color = "black";

      const index = this.getUnitInfo().infoArr.findIndex(
        (item) => this.getUnitInfo().id === item.getUnitInfo().id
      );

      this.getUnitInfo().infoArr.splice(index, 1);
      this.allWarriors.splice(index, 1);
    }
  }

  // sprawdza czy sa jacys wrogowie
  // jesli sa, to idzie dalej
  private isTarget() {
    if (this.noTarget) {
      this.randomWalk();
      return;
    }
  }
  // jesli jest, to ma go atakowac
  // sprawdza czy jest juz wyliczona odleglosc do najblizszego wroga
  // i czy jest blisko niego
  private canAttack() {
    const enemy = this.enemy;
    if (!enemy) {
      return false;
    }

    const { x: enemyX, y: enemyY } = enemy.getUnitInfo();
    const { x: myX, y: myY, unitSize } = this.getUnitInfo();

    const distanceX = Math.abs(enemyX - myX);
    const distanceY = Math.abs(enemyY - myY);

    return distanceX < unitSize + 2 && distanceY < unitSize + 2;
  }

  private attack() {
    this.enemy!.hp = this.enemy!.hp + this.enemy!.armor - this.dmg;
    const enemyHp = this.enemy!.hp;
    const color = `rgba(${this.enemy!.armySide === "redArmy" ? enemyHp : 0}, ${
      this.enemy!.armySide === "blueArmy" ? enemyHp : 0
    }, 0, ${enemyHp})`;
    this.enemy!.setColor(color);

    if (enemyHp < 10) {
      // this.enemyOdleglosc = undefined;
      this.enemy = undefined;
    }
  }

  // cala logika unita
  public closestEnemy() {
    // sprawdza czy martwy
    this.die();

    this.berserk();

    // sprawdza czy jest cel
    this.isTarget();

    // sprawdza czy moze zaatakowac
    // jesli tak, to atakuje
    if (this.canAttack()) {
      this.attack();
    }

    // jesli powyzszy kod nie by wypelniony
    // to ma zapisac array przeciwnikow
    this.enemyArr = this.findEnemies();

    // pozycja unita
    const position = this.getUnitInfo().x + this.getUnitInfo().y;

    // gdy juz zapisze nowych enemyArr, bedzie pelny undefined
    // trzeba arr oczyscic od znaczen undefined
    // najpierw sortuje wszystkie undefined na koniec array
    this.enemyArr.sort();

    // tutaj sprawdza undefined, gdzie sie zaczynaja i je wycina
    delUndefined<Warrior>(this.enemyArr);

    // zapisuje wszystkie pozycje wrogow i ich id
    const enemyPositions = this.enemyArr.map((item) => {
      return {
        enemPos: item.getUnitInfo().x + item.getUnitInfo().y,
        id: item.getUnitInfo().id,
      };
    });

    // zwraca array wyliczonych odleglosci wrogow
    const odlegloscWrogow = enemyPositions.map((item) => {
      if (position > item.enemPos) {
        const OdlegloscWroga = position - item.enemPos;

        return { odlegloscWroga: OdlegloscWroga, id: item.id };
      } else {
        const OdlegloscWroga = item.enemPos - position;

        return { odlegloscWroga: OdlegloscWroga, id: item.id };
      }
    });

    // zwraca najmniejsza cyfre z array
    let min: number = Math.min(
      ...odlegloscWrogow.map((item) => item.odlegloscWroga)
    );

    // na podstawie odleglosci znajduje id najblizszego wroga
    const obj = odlegloscWrogow.map((item) => {
      if (item.odlegloscWroga == min) {
        return item;
      }
      return;
    });

    // sortujemy undefined i je usuwamy
    obj.sort();
    delUndefined<{
      odlegloscWroga: number;
      id: number;
    }>(obj);

    // wyciaga najblizszego wroga z arraya na podstawie jego ID
    const objDestination = this.enemyArr.find((item) => {
      return item.getUnitInfo().id == obj[0]!.id;
    });

    // sprawdza czy wogole sa jacys jeszcze wrogowie
    // jesli nie ma nikogo to ma wlaczyc tryb nic nie robienia
    if (!objDestination) {
      this.noTarget = true;
      return;
    } else {
      // jesli wrog jest, to na podstawie jego kordynat, ma do niego isc
      this.walkTo({
        x: objDestination.getUnitInfo().x,
        y: objDestination.getUnitInfo().y,
      });
    }

    // ma zapisac wyliczona odleglosc wroga do siebie
    // zeby caly czas wiedzial jak blisko sie znajduje do niego
    const wrogOdleglosc = obj[0]!.odlegloscWroga;

    // gdy juz bedzie wystarczajaca blisko, to ma wlaczyc tryb ataku zamiast
    // calej logiki szukania wroga
    if (wrogOdleglosc < this.getUnitInfo().unitSize * 2) {
      this.enemy = objDestination;
      // this.enemyOdleglosc = wrogOdleglosc;
    }
  }
}
