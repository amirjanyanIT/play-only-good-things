import { makeAutoObservable } from "mobx";

/*
    e = Empty
    x = Negative
    o = Positive
    p = Player
*/

type ObjectsT = "e" | "x" | "o" | "p";
type RatesT = {type: ObjectsT, rate: number}[];

class Store {
  board: ObjectsT[][] = [];
  scale = 30;

  rates: RatesT = [
    { type: "e", rate: 0.7 },
    { type: "x", rate: 0.1 },
    { type: "o", rate: 0.2 },
  ];

  initialize() {
    for (let i = 0; i <= this.scale * 3; i++) {
      this.board[i] = [];
      for (let j = 0; j <= this.scale; j++) {
        this.board[i][j] = "e";
      }
    }
  }

  genItem() {
    const totalRate = this.rates.reduce((total, { rate }) => total + rate, 0);

    const randomValue = Math.random() * totalRate;

    let cumulative = 0;
    for (const { type, rate } of this.rates) {
      cumulative += rate;
      if (randomValue <= cumulative) {
        return type;
      }
    }

    return null;
  }

  

  

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }
}

export const store = new Store();
