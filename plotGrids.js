function plotGrids(obj, allPoints, gridArr, lerpValue) {
  let head25p = Math.floor(allPoints.head.length / 4);
  let head50p = Math.floor(allPoints.head.length / 2);
  let tail50p = Math.floor(allPoints.tail.length / 2);
  let leftLeg100p = Math.floor(allPoints.leftLeg.length - 1);

  let topLine = {
    start: {
      x: allPoints.head[head50p].x - obj.body.bustPoint.x - obj.body.size,
      y: allPoints.head[head25p].y - obj.body.bustPoint.y - obj.body.size,
    },
    end: {
      x: allPoints.tail[tail50p].x + obj.body.caboosePoint.x + obj.body.size,
      y: allPoints.head[head25p].y - obj.body.bustPoint.y - obj.body.size,
    },
  };

  let bottomLine = {
    start: {
      x: allPoints.head[head25p].x - obj.body.bustPoint.x - obj.body.size,
      y: allPoints.leftLeg[leftLeg100p].y + obj.leftLeg.size,
    },
    end: {
      x: allPoints.tail[tail50p].x + obj.body.caboosePoint.x + obj.body.size,
      y: allPoints.leftLeg[leftLeg100p].y + obj.leftLeg.size,
    },
  };

  let topRow = [];
  let bottomRow = [];

  for (let i = 0; i < 1; i += lerpValue) {
    topRow.push(
      lerp(
        [topLine.start.x, topLine.start.y],
        [topLine.end.x, topLine.end.y],
        null,
        i
      )
    );
  }

  for (let i = 1; i > 0; i -= lerpValue) {
    bottomRow.push(
      lerp(
        [bottomLine.start.x, bottomLine.start.y],
        [bottomLine.end.x, bottomLine.end.y],
        null,
        i
      )
    );
  }

  for (let i = 0; i < bottomRow.length - 1; i++) {
    let topRowPoint = {
      x: topRow[i].x,
      y: topRow[i].y,
    };
    let bottomRowPoint = {
      x: bottomRow[bottomRow.length - i - 1].x,
      y: bottomRow[bottomRow.length - i - 1].y,
    };

    for (let q = 1; q > 0; q -= lerpValue) {
      gridArr.push(
        lerp(
          [topRowPoint.x, topRowPoint.y],
          [bottomRowPoint.x, bottomRowPoint.y],
          null,
          q
        )
      );
    }
  }
}
