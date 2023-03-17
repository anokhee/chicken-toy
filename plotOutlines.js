function plotOutlines(obj, allPoints, fullBodyOutline, headOutline, lerpVal) {
  let headPoints = allPoints.head;
  let bodyPoints = allPoints.body;
  let tailPoints = allPoints.tail;
  let rightLegPoints = allPoints.rightLeg;
  let leftLegPoints = allPoints.leftLeg;

  let topRow = [];
  let bottomRow = [];
  let headConnectingRow = [];

  let head25p = Math.floor(headPoints.length * 0.25);
  let head50p = Math.floor(headPoints.length * 0.5);

  let body25p = Math.floor(bodyPoints.length * 0.25 - 1);
  let body50p = Math.floor(bodyPoints.length * 0.5 - 1);
  let body75p = Math.floor(bodyPoints.length * 0.75 - 1);

  let rightLeg50p = Math.floor(rightLegPoints.length * 0.5 - 1);
  let leftLeg50p = Math.floor(leftLegPoints.length * 0.5 - 1);

  let tail100p = Math.floor(tailPoints.length - 1);

  let pushToTopRow = (point) => {
    fullBodyOutline.push(point);
    topRow.push(point);
  };

  let pushToBottomRow = (point) => {
    fullBodyOutline.push(point);
    bottomRow.push(point);
  };

  let pushToConnectingRow = (point) => {
    headConnectingRow.push(point);
  };

  let getCurvePoints = function (a, b, c, func) {
    for (let i = 0; i < 1; i += lerpVal) {
      let point = lerp(a, b, c, i);
      func(point);
    }
  };

  this.bodyBeziersTop = {
    p1: [
      [headPoints[head50p].x, headPoints[head50p].y],
      [
        (headPoints[head50p].x + bodyPoints[body25p].x) / 2,
        (headPoints[head50p].y + bodyPoints[body25p].y) / 2 - 75,
      ],
      [bodyPoints[body75p].x, bodyPoints[body75p].y],
    ],
    p2: [
      [bodyPoints[body75p].x, bodyPoints[body75p].y],
      [bodyPoints[body75p].x + 50, bodyPoints[body75p].y + 45],
      [tailPoints[tail100p].x, tailPoints[tail100p].y],
    ],
  };

  this.bodyBeziersBottom = {
    p1: [
      [tailPoints[0].x, tailPoints[0].y],
      [
        bodyPoints[body50p].x + obj.body.caboosePoint.x,
        bodyPoints[body50p].y + obj.body.caboosePoint.y,
      ],
      [rightLegPoints[rightLeg50p].x, rightLegPoints[rightLeg50p].y],
    ],
    p2: [
      [rightLegPoints[0].x, rightLegPoints[0].y],
      [(rightLegPoints[3].x + leftLegPoints[0].x) / 2 + 15, leftLegPoints[0].y],
      [leftLegPoints[leftLeg50p + 1].x, leftLegPoints[leftLeg50p + 1].y],
    ],
  };

  for (let i = 0; i < head50p; i++) {
    pushToTopRow({
      x: headPoints[headPoints.length - i - 1].x,
      y: headPoints[headPoints.length - i - 1].y,
    });
  }

  getCurvePoints(
    this.bodyBeziersTop.p1[0],
    this.bodyBeziersTop.p1[1],
    this.bodyBeziersTop.p1[2],
    pushToTopRow
  );

  getCurvePoints(
    this.bodyBeziersTop.p2[0],
    this.bodyBeziersTop.p2[1],
    this.bodyBeziersTop.p2[2],
    pushToTopRow
  );

  // Bottom Row

  getCurvePoints(
    this.bodyBeziersBottom.p1[0],
    this.bodyBeziersBottom.p1[1],
    this.bodyBeziersBottom.p1[2],
    pushToBottomRow
  );

  for (let i = rightLeg50p; i > 0; i--) {
    pushToBottomRow({
      x: rightLegPoints[i].x,
      y: rightLegPoints[i].y,
    });
  }

  getCurvePoints(
    this.bodyBeziersBottom.p2[0],
    this.bodyBeziersBottom.p2[1],
    this.bodyBeziersBottom.p2[2],
    pushToBottomRow
  );

  for (let i = leftLeg50p + 1; i >= 0; i--) {
    pushToBottomRow({
      x: leftLegPoints[i].x,
      y: leftLegPoints[i].y,
    });
  }

  getCurvePoints(
    [leftLegPoints[0].x, leftLegPoints[0].y],
    [bodyPoints[0].x - obj.body.bustPoint.x, bodyPoints[0].y],
    [headPoints[head25p].x, headPoints[head25p].y],
    pushToBottomRow
  );

  for (let i = head25p; i >= 0; i--) {
    pushToBottomRow({
      x: headPoints[i].x,
      y: headPoints[i].y,
    });
  }

  let headTopRow = [];
  let headBottomRow = [];
  let headConnectingLine = {
    top: null,
    bottom: null,
  };

  for (let i = 0; i < obj.head.cutOff.top; i++) {
    headTopRow.push(fullBodyOutline[i]);
  }

  for (let i = obj.head.cutOff.bottom; i > 0; i--) {
    headBottomRow.push(fullBodyOutline[fullBodyOutline.length - 1 - i]);
  }

  headConnectingLine.top = {
    x: headTopRow[headTopRow.length - 1].x,
    y: headTopRow[headTopRow.length - 1].y,
  };

  headConnectingLine.bottom = {
    x: headBottomRow[0].x,
    y: headBottomRow[0].y,
  };

  for (let i = 0; i < headTopRow.length; i++) {
    headOutline.push(headTopRow[i]);
  }

  getCurvePoints(
    [headConnectingLine.top.x, headConnectingLine.top.y],
    [headConnectingLine.bottom.x, headConnectingLine.bottom.y],
    null,
    pushToConnectingRow
  );

  for (let i = 0; i < headConnectingRow.length; i++) {
    if (i % 2 === 0) {
      headOutline.push({
        x: headConnectingRow[i].x,
        y: headConnectingRow[i].y,
      });
    } else {
      headOutline.push({
        x: headConnectingRow[i].x + obj.head.ridgeOff.x,
        y: headConnectingRow[i].y + obj.head.ridgeOff.y,
      });
    }
  }

  for (let i = 0; i < headBottomRow.length; i++) {
    headOutline.push(headBottomRow[i]);
  }
  headOutline.push(fullBodyOutline[0].x, fullBodyOutline[0].y);
}
