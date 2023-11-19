import { makeAutoObservable } from "mobx";

/*
    e = Empty
    x = Negative
    o = Positive
    p = Player
*/

type ObjectsT = "e" | "x" | "o" | "p";
type RatesT = { type: ObjectsT; rate: number }[];

class Store {
  board: ObjectsT[][] = [];
  scale = 10;
  itemsAtLine = 5;

  rates: RatesT = [
    { type: "e", rate: 0 },
    { type: "x", rate: 0.1 },
    { type: "o", rate: 0.2 },
  ];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.scale * 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.scale; j++) {
        this.board[i][j] = "e";
      }
    }
  }

  private genItem() {
    const totalRate = this.rates.reduce((total, { rate }) => total + rate, 0);

    const randomValue = Math.random() * totalRate;

    let cumulative = 0;
    for (const { type, rate } of this.rates) {
      cumulative += rate;
      if (randomValue <= cumulative) {
        return type;
      }
    }

    return "x";
  }

  private createNewLine() {
    const line: ObjectsT[] = [];
    for (let j = 0; j < this.scale; j++) {
      line.push("e");
    }

    this.board[0] = line;
  }

  private setItemInitialPosition(round: number) {
    for (let i = 0; i < round; i++) {
      let emptyPositions: number[] = [];

      this.board[0].forEach((c, i) => {
        if (c === "e") {
          emptyPositions.push(i);
        }
      });

      let position = Math.floor(Math.random() * emptyPositions.length);

      const pickedPosition = emptyPositions[position];

      this.board[0][pickedPosition] = this.genItem();
    }

    return true;
  }

  public moveBoard() {
    let lastLine = this.board[this.board.length - 1];

    for (let i = this.board.length - 1; i >= 0; i--) {
      this.board[i] = this.board[i - 1];
    }

    this.createNewLine();
    this.setItemInitialPosition(this.itemsAtLine);

    return lastLine;
  }
}

export const store = new Store();
