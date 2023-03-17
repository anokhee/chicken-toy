let chickenArr, chickenFramesArr;
let chickenCount = 0;
let layout = {
  cols: null,
  rows: null,
};

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
    layout.cols = chickenParams.majorParams.layout.value.cols;
    layout.rows = chickenParams.majorParams.layout.value.rows;

    for (let i = 0; i < layout.cols; i++) {
      for (let j = 0; j < layout.rows; j++) {
        chickenCount += 1;
        let frameWidth = w / layout.cols;
        let frameHeight = h / layout.rows;
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
