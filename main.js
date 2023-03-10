let patternCols = 1;
let patternRows = 1;
let chickenFramesArr = [];
let chickenArr = [];

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
    console.log("it works");
    chickenArr = [];
    for (let i = 0; i < patternCols; i++) {
      for (let j = 0; j < patternRows; j++) {
        let blockWidth = w / patternCols;
        let blockHeight = h / patternRows;
        chickenArr.push(
          new Chicken(
            blockWidth / 2 + blockWidth * i,
            blockHeight / 2 + blockHeight * j,
            blockWidth,
            blockHeight
          )
        );
        chickenFramesArr.push([i, blockWidth, blockHeight]);
      }
    }
    renderChickens(chickenArr);
  };

  let w, h;

  window.removeEventListener("load", init);
  window.addEventListener("resize", resize);
  resize();
  generateGUI(draw(), chickenArr);
  window.requestAnimationFrame(draw);
};

window.addEventListener("load", init);
