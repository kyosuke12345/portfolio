import { Alert, AlertTitle, Box } from "@mui/material";
import { useState } from "react";
import { useKey, useDidMount, useIntervalWhen } from "rooks";
import { Tetris, TETRIS_FPS } from "utils/tetris";

const TetrisScreen: React.VFC = () => {
  const [_, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [tetris] = useState(() => new Tetris());
  useDidMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // eslint-why nullは無視する。
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const context = canvas!.getContext("2d");
    if (context != null) {
      context.fillStyle = "red";
      context.fillRect(0, 0, 100, 100);
    }
    setContext(context);
    // eslint-why undefinedにならないので、強制的に入れ込む
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tetris.setContext(canvas!, context!);
  });

  useKey(37, () => {
    // left
    tetris.moveBlock(-1, 0);
  });
  useKey(38, () => {
    // up
    const newtetro = tetris.rotate();
    tetris.moveBlock(0, 0, newtetro);
  });
  useKey(39, () => {
    // right
    tetris.moveBlock(1, 0);
  });
  useKey(40, () => {
    // down
    tetris.moveBlock(0, 1);
  });
  useKey(32, () => {
    // space
    tetris.clickSpace();
  });
  useIntervalWhen(() => {
    tetris.main();
  }, 1000 / TETRIS_FPS);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Alert severity="info">
          <AlertTitle>テトリス</AlertTitle>
          久しぶりにテトリスを作成してみました。
          今後、エフェクトやSEなどを実装していく予定。
        </Alert>
      </Box>
      <Box sx={{ mb: 2, alignItems: "center" }}>
        <canvas id={"canvas"}></canvas>
      </Box>
    </>
  );
};

export default TetrisScreen;
