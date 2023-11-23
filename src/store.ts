import { makeAutoObservable } from "mobx";

/*
    e = Empty
    x = Negative
    o = Positive
    p = Player
*/

export type ObjectsT = "e" | "x" | "o" | "p";
type RatesT = { type: ObjectsT; rate: number }[];

type GameStatusT = "hold" | "in-progress" | "game-over";
type PlayerDirection = "left" | "right";
type ModeT = "dev" | "prod";
type ScoreBoardT = {name: string, score: number}[];
class Store {
  mode: ModeT = "dev";
  gameTitle = "Only Good Things";
  player: string = "Player";
  display: [number, number] = [600, 800];
  scale: number = 6;
  itemsAtLine: number = 3;
  itemsPerLine: {
    perLine: number;
    counter: number;
  } = {
    perLine: 5,
    counter: 1,
  };

  rates: RatesT = [
    { type: "e", rate: 0 },
    { type: "x", rate: 0.1 },
    { type: "o", rate: 0.2 },
  ];

  intervalName: number | null = null;

  gameStatus: GameStatusT = "hold";
  lifes = 3;
  score = 0;
  speed: number = 1000;
  board: ObjectsT[][] = [];
  playerLine: ObjectsT[] = [];
  boardLastLine: ObjectsT[] = [];
  scoreboard: ScoreBoardT = [];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  applySettings(settings: { player?: string; speed?: number }) {
    this.player = settings.player ? settings.player : this.player;
    this.speed = settings.speed ? settings.speed : this.speed;

    return true;
  }

  initialize() {
    this.playerLine = [];
    this.lifes = 3;
    this.score = 0;
    this.speed = 1000;

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
    if (this.itemsPerLine.perLine !== this.itemsPerLine.counter) {
      this.itemsPerLine.counter = this.itemsPerLine.counter + 1;
      return true;
    }

    this.itemsPerLine.counter = 0;

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

    this.boardLastLine = lastLine;

    return true;
  }

  private lifeCycle(callback: () => void, startSpeedMS: number) {
    let intervalName = setInterval(callback, startSpeedMS);

    return {
      changeInterval: (ms: number) => {
        clearInterval(intervalName);
        intervalName = setInterval(callback, ms);
      },
      kill: () => clearInterval(intervalName),
    };
  }

  public movePlayer(direction: PlayerDirection) {
    if (this.mode === "prod" && this.gameStatus !== "in-progress") {
      return false;
    }

    const whiteLine: ObjectsT[] = [...this.playerLine].map(() => "e");

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

    this.playerLine = whiteLine;

    return true;
  }

  public start(onGameOver: () => void) {
    this.initialize();
    this.gameStatus = "in-progress";

    let interval = 500;
    let deepScore = 0;

    const gameProgressCalculation = () => {
      this.moveBoard();
      const indexOfPlayer = this.playerLine.indexOf("p");

      for (let index = 0; index < this.boardLastLine.length; index++) {
        const e = this.boardLastLine[index];

        if (indexOfPlayer === index) {
          switch (e) {
            case "o": {
              this.score = this.score + 10;
              deepScore = deepScore + 1;
              break;
            }
            case "x": {
              this.lifes = this.lifes - 1;

              if (this.lifes === 0) {
                onGameOver();
                gameLifeCycle.kill();
                this.scoreboard.push({ name: this.player, score: this.score });
                break;
              }
            }
          }
        }
      }

      if (deepScore === 10 && interval > 80) {
        deepScore = 0;
        interval = interval - 60;
        gameLifeCycle.changeInterval(interval);
      }
    };

    var gameLifeCycle = this.lifeCycle(gameProgressCalculation, interval);

    return {
      endGameImmeditely: () => {
        gameLifeCycle.kill();
      }
    }
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
