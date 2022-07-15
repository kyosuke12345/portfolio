const BOARD_W = 10;
const BOARD_H = BOARD_W * 2;
const BLOCK_SIZE = 30;
const RESULT_SCREEN_W = 220;
const HOLD_SCREEN_W = 220;
const GAME_SCREEN_W = BOARD_W * BLOCK_SIZE;
const GAME_SCREEN_H = BOARD_H * BLOCK_SIZE;
const SCREEN_W = GAME_SCREEN_W + RESULT_SCREEN_W + HOLD_SCREEN_W;
const SCREEN_H = GAME_SCREEN_H + 10;
const TETRO_SIZE = 4;
const START_X = BOARD_W / 2 - TETRO_SIZE / 2;
const START_Y = 0;
export const TETRIS_FPS = 30;
const DROP_TETRO_FRAME = TETRIS_FPS / 2;
const BLOCK_COLOR = [
  "#000", //0空
  "#6CF", //1水色
  "#F92", //2オレンジ
  "#66F", //3青
  "#C5C", //4紫
  "#FD2", //5黄色
  "#F44", //6赤
  "#5B5", //7緑
];

const BLOCK_TYPES = [
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // 2.L
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 3.J
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 4.T
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    // 5.O
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 6.Z
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    // 7.S
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
];

const GAME_STATE = {
  TITLE: 0,
  GAME: 1,
  RESULT: 2,
} as const;

export class Tetris {
  board: number[][] = [];
  tetro: number[][] = [];
  x = 0;
  y = 0;
  type = 0;
  nextType = 0;
  deleteLineCnt = 0;
  gameFrameCnt = 0;
  hold = 0;
  holdFlg = false;
  state: typeof GAME_STATE[keyof typeof GAME_STATE] = GAME_STATE.TITLE; // 0…開始画面 1…ゲーム画面 2…リザルト
  con!: CanvasRenderingContext2D;
  canvas!: HTMLCanvasElement;

  private clacStartY(tetro: number[][]): number {
    // 次ブロックの一番最初が見えるように設定
    let startDiffY = -1;
    for (let y = TETRO_SIZE - 1; y >= 0; y--) {
      for (let x = 0; x < TETRO_SIZE; x++) {
        if (tetro[y][x]) {
          startDiffY = y;
          break;
        }
      }
      if (startDiffY >= 0) {
        break;
      }
    }
    return START_Y - startDiffY - 1;
  }

  private getRandBlockType(): number {
    return Math.floor(Math.random() * (BLOCK_TYPES.length - 1)) + 1;
  }

  private createNewBlock() {
    if (this.nextType == 0 && this.type == 0) {
      this.nextType = this.getRandBlockType();
      this.type = this.getRandBlockType();
    } else {
      this.type = this.nextType;
      this.nextType = this.getRandBlockType();
    }
    this.tetro = BLOCK_TYPES[this.type];
    this.x = START_X;
    this.y = this.clacStartY(this.tetro);
  }

  private holdProc(): void {
    if (!this.holdFlg) {
      this.holdFlg = true;
      if (this.hold == 0) {
        // 初めてのholdの場合は、次のブロックを今のブロックとし、次のブロックを生成する。
        this.hold = this.type;
        this.type = this.nextType;
        this.nextType = this.getRandBlockType();
      } else {
        const tmp = this.hold;
        this.hold = this.type;
        this.type = tmp;
      }
      this.tetro = BLOCK_TYPES[this.type];
      this.x = START_X;
      this.y = this.clacStartY(this.tetro);
    }
  }

  private initGame() {
    this.board = [];
    this.type = 0;
    this.nextType = 0;
    for (let y = 0; y < BOARD_H; y++) {
      this.board[y] = [];
      for (let x = 0; x < BOARD_W; x++) {
        this.board[y][x] = 0;
      }
    }
    this.createNewBlock();
    this.state = GAME_STATE.GAME;
    this.gameFrameCnt = 0;
    this.deleteLineCnt = 0;
    this.hold = 0;
    this.holdFlg = false;
  }

  setContext(canvas: HTMLCanvasElement, con: CanvasRenderingContext2D): void {
    this.canvas = canvas;
    this.con = con;

    this.canvas.width = SCREEN_W;
    this.canvas.height = SCREEN_H;
    // this.canvas.style.border = "5px solid #555";
  }

  public moveBlock(mx: number, my: number, tetro?: number[][]): void {
    if (this.state === GAME_STATE.GAME) {
      const check_tetro = tetro !== undefined ? tetro : this.tetro;
      if (this.checkMove(mx, my, check_tetro)) {
        this.x = this.x + mx;
        this.y = this.y + my;
        this.tetro = check_tetro;
      }
    }
  }

  private checkMove(mx: number, my: number, tetro: number[][]): boolean {
    for (let y = 0; y < TETRO_SIZE; y++) {
      for (let x = 0; x < TETRO_SIZE; x++) {
        if (tetro[y][x]) {
          const nx = this.x + mx + x;
          const ny = this.y + my + y;
          if (
            // ny < 0 ||
            nx < 0 ||
            nx >= BOARD_W ||
            ny >= BOARD_H ||
            (ny >= 0 && this.board[ny][nx])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }
  private isGameEnd(): boolean {
    // 一番上まで来たらゲーム終了とする
    for (let x = 0; x < BOARD_W; x++) {
      if (this.board[0][x]) {
        return true;
      }
    }
    return false;
  }

  public rotate(): number[][] {
    const new_tetro: number[][] = [];
    for (let y = 0; y < TETRO_SIZE; y++) {
      new_tetro[y] = [];
      for (let x = 0; x < TETRO_SIZE; x++) {
        new_tetro[y][x] = this.tetro[TETRO_SIZE - x - 1][y];
      }
    }
    return new_tetro;
  }

  private drawBlock(px: number, py: number, color: number): void {
    this.con.fillStyle = BLOCK_COLOR[color];
    this.con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    this.con.strokeStyle = "white";
    this.con.lineWidth = 1;
    this.con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
  }

  private drawGameBlock(x: number, y: number, color: number): void {
    const px = x * BLOCK_SIZE + HOLD_SCREEN_W;
    const py = y * BLOCK_SIZE;
    this.drawBlock(px, py, color);
  }

  private drawHoldBlock(): void {
    // 次のブロック表示
    this.drawText("Hold", 10, 30, 20);
    this.con.strokeStyle = "white";
    this.con.lineWidth = 1;
    this.con.strokeRect(10, 50, 190, 190);
    if (this.hold > 0) {
      const holdTetro = BLOCK_TYPES[this.hold];
      for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
          if (holdTetro[y][x]) {
            const px = x * BLOCK_SIZE + 45;
            const py = y * BLOCK_SIZE + 80;
            this.drawBlock(px, py, this.hold);
          }
        }
      }
    }
  }

  private drawNextBlock(): void {
    // 次のブロック表示
    this.drawText("Next", 530, 30, 20);
    this.con.strokeStyle = "white";
    this.con.lineWidth = 1;
    this.con.strokeRect(535, 50, 190, 190);
    if (this.nextType > 0) {
      const nextTetro = BLOCK_TYPES[this.nextType];
      for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
          if (nextTetro[y][x]) {
            const px =
              GAME_SCREEN_W +
              HOLD_SCREEN_W +
              RESULT_SCREEN_W / 2 -
              (TETRO_SIZE / 2) * BLOCK_SIZE +
              x * BLOCK_SIZE;
            const py = y * BLOCK_SIZE + 80;
            this.drawBlock(px, py, this.nextType);
          }
        }
      }
    }
  }

  private drawText(
    txt: string,
    px: number,
    py: number,
    fontSize?: number,
    color?: string
  ): void {
    this.con.fillStyle = color === undefined ? "white" : color;
    this.con.font =
      fontSize === undefined ? "32pt Arial" : fontSize.toString() + "px Arial";
    this.con.fillText(txt, px, py);
  }

  private darawLine(
    sx: number,
    sy: number,
    ex: number,
    ey: number,
    color?: string,
    lineWidth?: number
  ): void {
    this.con.beginPath();
    this.con.moveTo(sx, sy);
    this.con.lineTo(ex, ey);
    this.con.strokeStyle = color === undefined ? "white" : color;
    this.con.lineWidth = lineWidth === undefined ? 10 : lineWidth;
    this.con.stroke();
  }

  private drawGameScreen(): void {
    // 盤面の描画
    if (this.board.length > 0) {
      for (let y = 0; y < BOARD_H; y++) {
        for (let x = 0; x < BOARD_W; x++) {
          if (this.board[y][x]) {
            this.drawGameBlock(x, y, this.board[y][x]);
          }
        }
      }
    }
    // 落ちているブロックの描画
    if (this.tetro.length > 0) {
      for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
          if (this.tetro[y][x]) {
            this.drawGameBlock(this.x + x, this.y + y, this.type);
          }
        }
      }
    }

    // 次のブロック表示
    this.drawNextBlock();
    // Holdブロック表示
    this.drawHoldBlock();
    // スコアの表示
    this.drawText("Score: " + this.getScore().toString(), 10, 280, 25);
    // 操作説明
    this.drawText("操作方法", 580, 480, 20);
    const offsetY = 20;
    const startY = 500;
    this.drawText("←: ←", 600, startY, 15);
    this.drawText("→: →", 600, startY + offsetY * 1, 15);
    this.drawText("↑: 回転", 600, startY + offsetY * 2, 15);
    this.drawText("SPACE: Hold", 600, startY + offsetY * 3, 15);
  }

  private getScore(): number {
    return this.deleteLineCnt * 100;
  }

  private fixTetro() {
    for (let y = 0; y < TETRO_SIZE; y++) {
      for (let x = 0; x < TETRO_SIZE; x++) {
        if (this.tetro[y][x]) {
          if (this.y + y >= 0) {
            this.board[this.y + y][this.x + x] = this.type;
          }
        }
      }
    }
  }

  private deleteLine(): number {
    let deleteLineCnt = 0;
    for (let y = 0; y < BOARD_H; y++) {
      let isDelete = true;
      for (let x = 0; x < BOARD_W; x++) {
        if (!this.board[y][x]) {
          isDelete = false;
          break;
        }
      }
      if (isDelete) {
        deleteLineCnt++;
        for (let ny = y; ny > 0; ny--) {
          for (let x = 0; x < BOARD_W; x++) {
            this.board[ny][x] = this.board[ny - 1][x];
          }
        }
      }
    }
    return deleteLineCnt;
  }

  public clickSpace(): void {
    switch (this.state) {
      case GAME_STATE.TITLE:
        this.state = GAME_STATE.GAME;
        this.initGame();
        break;
      case GAME_STATE.GAME:
        this.holdProc();
        break;
      case GAME_STATE.RESULT:
        this.state = GAME_STATE.TITLE;
        break;
    }
  }

  public main(): void {
    // 一旦、前フレームの描画をクリア
    this.con.clearRect(0, 0, SCREEN_W, SCREEN_H);

    // キャンバスの背景色を変更
    this.con.fillStyle = "black";
    this.con.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // テトリスの盤面表示
    this.con.fillStyle = "gray";
    this.con.fillRect(HOLD_SCREEN_W, 0, GAME_SCREEN_W, GAME_SCREEN_H);

    this.drawGameScreen();
    switch (this.state) {
      case GAME_STATE.TITLE:
        this.drawText("Game Start", 240, SCREEN_H / 2, 50);
        break;
      case GAME_STATE.GAME:
        this.gameFrameCnt++;
        if (this.gameFrameCnt % DROP_TETRO_FRAME == 0) {
          this.gameFrameCnt = 0; // 一応0に戻す
          if (this.checkMove(0, 1, this.tetro)) {
            this.moveBlock(0, 1);
          } else {
            this.holdFlg = false;
            // 下まで落ちた
            this.fixTetro();
            // ブロックを消す
            this.deleteLineCnt += this.deleteLine();
            // 新しいtetroの生成
            this.createNewBlock();
            // ゲーム終了判定
            if (this.isGameEnd()) {
              this.state = GAME_STATE.RESULT;
            }
          }
        }
        break;
      case GAME_STATE.RESULT:
        this.drawText("Game Over", 240, SCREEN_H / 2, 50);
        break;
    }
  }
}
