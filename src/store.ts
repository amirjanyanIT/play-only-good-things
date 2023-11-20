import { makeAutoObservable } from "mobx";

/*
    e = Empty
    x = Negative
    o = Positive
    p = Player
*/

type ObjectsT = "e" | "x" | "o" | "p";
type RatesT = { type: ObjectsT; rate: number }[];

type GameStatusT = "hold" | "in-progress" | "game-over";
type PlayerDirection = "left" | "right";

class Store {
  gameTitle = "Only Good Things";

  player: string = "Player";

  gameStatus: GameStatusT = "hold";
  speed: number = 1000;
  display: [number, number] = [800, 600];
  board: ObjectsT[][] = [];
  scale: number = 10;
  itemsAtLine: number = 5;

  rates: RatesT = [
    { type: "e", rate: 0 },
    { type: "x", rate: 0.1 },
    { type: "o", rate: 0.2 },
  ];

  intervalName: number | null = null;

  playerLine: ObjectsT[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  applySettings(settings: {
    player: string;
    display: [number, number];
    itemsAtLine: number;
    speed: number;
  }) {
    
    this.player = settings.player;
    this.display = settings.display;
    this.itemsAtLine = settings.itemsAtLine;
    this.speed = settings.speed;

    return true;
    
  }

  initialize() {
    for (let i = 0; i < this.scale * 3; i++) {
      this.board[i] = [];

      for (let j = 0; j < this.scale; j++) {
        this.board[i][j] = "e";
      }
    }

    for (let j = 0; j < this.scale; j++) {
      this.playerLine.push("e");
    }

    this.playerLine[(this.playerLine.length - 1) / 2] = "p";
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

  private moveBoard() {
    let lastLine = this.board[this.board.length - 1];

    for (let i = this.board.length - 1; i >= 0; i--) {
      this.board[i] = this.board[i - 1];
    }

    this.createNewLine();
    this.setItemInitialPosition(this.itemsAtLine);

    return lastLine;
  }

  public movePlayer(direction: PlayerDirection) {
    if (this.gameStatus !== "in-progress") {
      return false;
    }

    const whiteLine = [...this.playerLine].map(() => "e");
    const currentDirection = this.playerLine.indexOf("p");

    if (currentDirection === 0 && direction === "left") {
      return false;
    }

    if (
      currentDirection === this.playerLine.length - 1 &&
      direction === "right"
    ) {
      return false;
    }

    switch (direction) {
      case "left": {
        whiteLine[currentDirection - 1] = "p";
        break;
      }
      case "right": {
        whiteLine[currentDirection + 1] = "p";
        break;
      }
    }

    return true;
  }

  public start() {
    this.initialize();
    this.gameStatus = "in-progress";

    this.intervalName = window.setInterval(() => {
      this.moveBoard();
    }, this.speed);
  }

  public end() {
    this.initialize();
    this.gameStatus = "hold";

    if (this.intervalName) {
      clearInterval(this.intervalName);
    }
  }
}

export const store = new Store();
