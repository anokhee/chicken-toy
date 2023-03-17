let chickenArr, chickenFramesArr, patternCols, patternRows;
let chickenCount = 0;

const init = () => {
  mainCanvas = document.getElementById("mainCanvas");
  c = mainCanvas.getContext("2d");

  const resize = () => {
    mainCanvas.width = w = window.innerWidth;
    mainCanvas.height = h = window.innerHeight;
    console.log(`screen resolution: ${w}px × ${h}px`);
    draw();
  };

  const draw = (t) => {
    chickenArr = [];
    chickenFramesArr = [];
    patternCols = chickenParams.majorParams.layout.value.cols;
    patternRows = chickenParams.majorParams.layout.value.rows;

    for (let i = 0; i < patternCols; i++) {
      for (let j = 0; j < patternRows; j++) {
        chickenCount += 1;
        let frameWidth = w / patternCols;
        let frameHeight = h / patternRows;
        chickenArr.push(
          new Chicken(
            chickenCount,
            frameWidth / 2 + frameWidth * i,
            frameHeight / 2 + frameHeight * j,
            frameWidth,
            frameHeight
          )
        );
        chickenFramesArr.push([i, frameWidth, frameHeight]);
      }
    }
    renderChickens(chickenArr);
  };

  let w, h;

  window.removeEventListener("load", init);
  window.addEventListener("resize", resize);
  resize();
  createGUI(chickenArr);
  window.requestAnimationFrame(draw);
};

window.addEventListener("load", init);
