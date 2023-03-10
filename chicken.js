class Chicken {
  constructor(xPos, yPos, frameWidth, frameHeight) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.resolution = chickenParams.majorParams.resolution.value;
    this.lerpValue = 1 / this.resolution;

    // Full Outline
    this.fullOutlineParams = {
      head: {
        size: chickenParams.head.size.value,
        posOffset: {
          x: chickenParams.head.posOffset.value.x,
          y: chickenParams.head.posOffset.value.y,
        },
        pointsArr: [],
        markersArr: (this.headMarkers = []),
        cutOff: {
          top: chickenParams.head.cutOff.value.top,
          bottom: chickenParams.head.cutOff.value.bottom,
        },
        ridgeOff: {
          x: chickenParams.head.ridgeOff.value.x,
          y: chickenParams.head.ridgeOff.value.y,
        },
      },
      body: {
        size: chickenParams.body.size.value,
        posOffset: {
          x: chickenParams.body.posOffset.value.x,
          y: chickenParams.body.posOffset.value.y,
        },
        caboosePoint: {
          x: chickenParams.body.caboosePoint.value.x,
          y: chickenParams.body.caboosePoint.value.x,
        },
        bustPoint: {
          x: chickenParams.body.bustPoint.value.x,
          y: chickenParams.body.bustPoint.value.x,
        },
        markersArr: (this.bodyMarkers = []),
      },
      rightLeg: {
        size: chickenParams.leg.size.value,
        posOffset: {
          x: chickenParams.leg.posOffset.value.x,
          y: chickenParams.leg.posOffset.value.y,
        },
        pointsArr: [],
        markersArr: (this.rightLegMarkers = []),
        length: chickenParams.leg.length.value,
      },
      leftLeg: {
        size: chickenParams.leg.size.value,
        posOffset: {
          x: -chickenParams.leg.posOffset.value.x,
          y: chickenParams.leg.posOffset.value.y,
        },
        pointsArr: [],
        markersArr: (this.leftLegMarkers = []),
        length: chickenParams.leg.length.value,
      },
      tail: {
        size: 5,
        posOffset: { x: 150, y: -105 },
        pointsArr: (this.tailPoints = []),
        markersArr: (this.tailMarkers = []),
      },
    };

    this.fullBodyOutline = [];
    this.headOutline = [];
    this.headOutlineTopRow = [];
    this.headOutlineBottomRow = [];

    // Pattern Grid Arrays
    this.bodyGrid = [];
    this.headGrid = [];

    // Beak
    this.beakParams = {
      length: -50,
      topCutoff: 5,
      bottomCutoff: 5,
      centerCurveOffsets: {
        cp1: { x: 0, y: 0 },
        cp2: { x: 0, y: 0 },
        cp3: { x: 0, y: 0 },
      },
      topCurveOffsets: {
        cp1: { x: 0, y: -10 },
        cp2: { x: 0, y: -10 },
        cp3: { x: 0, y: 0 },
      },
    };

    // Tail
    this.tailParams = {};
  }

  setupGuides() {
    for (const eachPart in this.fullOutlineParams) {
      let part = this.fullOutlineParams[eachPart];
      makePolygon(
        this.xPos + part.posOffset.x,
        this.yPos + part.posOffset.y,
        part.size,
        this.resolution,
        part.pointsArr,
        "white",
        true
      );

      part.markersArr.push(
        {
          x: this.xPos + part.posOffset.x - part.size,
          y: this.yPos + part.posOffset.y,
        },
        {
          x: this.xPos + part.posOffset.x,
          y: this.yPos + part.posOffset.y - part.size,
        },
        {
          x: this.xPos + part.posOffset.x + part.size,
          y: this.yPos + part.posOffset.y,
        },

        {
          x: this.xPos + part.posOffset.x,
          y: this.yPos + part.posOffset.y + part.size,
        }
      );
    }
  }

  clearOutlines() {
    this.fullBodyOutline = [];
    this.fullOutlineParams.head.pointsArr = [];
    this.fullOutlineParams.body.pointsArr = [];

    this.headOutline = [];
    this.headOutlineTopRow = [];
    this.headOutlineBottomRow = [];

    this.fullOutlineParams.rightLeg.pointsArr = [];
    this.fullOutlineParams.leftLeg.pointsArr = [];

    this.bodyGrid = [];
    this.headGrid = [];
  }

  plotOutlines() {
    this.headConnectingRow = [];
    this.headConnectingLine = {
      top: {},
      bottom: {},
    };

    let headPointsArr = this.fullOutlineParams.head.pointsArr;
    let bodyPointsArr = this.fullOutlineParams.body.pointsArr;
    let rightLegPointsArr = this.fullOutlineParams.rightLeg.pointsArr;
    let leftLegPointsArr = this.fullOutlineParams.leftLeg.pointsArr;
    let tailPointsArr = this.fullOutlineParams.tail.pointsArr;

    this.bodyBeziersTop = {
      b1: [
        [
          headPointsArr[Math.floor(headPointsArr.length * 0.5 - 1)].x,
          headPointsArr[Math.floor(headPointsArr.length * 0.5 - 1)].y,
        ],
        [
          (headPointsArr[Math.floor(headPointsArr.length * 0.5)].x +
            bodyPointsArr[Math.floor(bodyPointsArr.length * 0.25)].x) /
            2,
          (headPointsArr[Math.floor(headPointsArr.length * 0.5)].y +
            bodyPointsArr[Math.floor(bodyPointsArr.length * 0.25)].y) /
            2 -
            75,
        ],
        [
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.75)].x,
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.75)].y,
        ],
      ],
      b2: [
        [
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.75)].x,
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.75)].y,
        ],
        [
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.75)].x + 50,
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.75)].y + 45,
        ],
        [
          tailPointsArr[Math.floor(tailPointsArr.length * 0)].x,
          tailPointsArr[Math.floor(tailPointsArr.length * 0)].y,
        ],
      ],
    };

    this.bodyBeziersBottom = {
      b1: [
        [
          tailPointsArr[Math.floor(tailPointsArr.length * 0)].x,
          tailPointsArr[Math.floor(tailPointsArr.length * 0)].y,
        ],
        [
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.5)].x +
            this.fullOutlineParams.body.caboosePoint.x,
          bodyPointsArr[Math.floor(bodyPointsArr.length * 0.5)].y +
            this.fullOutlineParams.body.caboosePoint.y,
        ],
        [
          rightLegPointsArr[Math.floor(rightLegPointsArr.length * 0.5)].x,
          rightLegPointsArr[Math.floor(rightLegPointsArr.length * 0.5)].y,
        ],
      ],
      b2: [
        [
          rightLegPointsArr[Math.floor(rightLegPointsArr.length * 0.5)].x,
          rightLegPointsArr[Math.floor(rightLegPointsArr.length * 0.5)].y,
        ],
        [bodyPointsArr[0].x - 80, bodyPointsArr[0].y],
        [
          headPointsArr[Math.floor(headPointsArr.length * 0.75)].x,
          headPointsArr[Math.floor(headPointsArr.length * 0.75)].y,
        ],
      ],
    };

    // Arc around the top of the head
    for (let i = 0; i < Math.floor(headPointsArr.length * 0.5); i++) {
      this.fullBodyOutline.push({
        x: headPointsArr[headPointsArr.length - i - 1].x,
        y: headPointsArr[headPointsArr.length - i - 1].y,
      });
    }

    // Curves from the base of the head to the end of the tail
    for (const eachCurve in this.bodyBeziersTop) {
      let curve = this.bodyBeziersTop[eachCurve];
      for (let i = 0; i < 1; i += this.lerpValue) {
        this.fullBodyOutline.push(lerpCurve(curve[0], curve[1], curve[2], i));
      }
    }

    // Curves from the end of the tail back around the bottom to the right leg
    for (let i = 0; i < 1; i += this.lerpValue) {
      this.fullBodyOutline.push(
        lerpCurve(
          this.bodyBeziersBottom.b1[0],
          this.bodyBeziersBottom.b1[1],
          this.bodyBeziersBottom.b1[2],
          i
        )
      );
    }

    // // Curve around the right leg
    for (let i = Math.floor(rightLegPointsArr.length / 2); i > 0; i--) {
      this.fullBodyOutline.push({
        x: rightLegPointsArr[i].x,
        y: rightLegPointsArr[i].y,
      });
    }

    // // // Important -- This point ensures that the right leg ENDS where it needs to!
    for (let i = 0; i < 1; i += this.lerpValue) {
      this.fullBodyOutline.push(
        lerpCurve(
          [rightLegPointsArr[0].x, rightLegPointsArr[0].y],
          [
            (rightLegPointsArr[0].x +
              leftLegPointsArr[Math.floor(leftLegPointsArr.length / 2)].x) /
              2,
            rightLegPointsArr[0].y,
          ],
          [
            leftLegPointsArr[Math.floor(leftLegPointsArr.length / 2)].x,
            leftLegPointsArr[Math.floor(leftLegPointsArr.length / 2)].y,
          ],
          i
        )
      );
    }

    // // Curve around the left leg
    for (let i = Math.floor(leftLegPointsArr.length / 2); i > 0; i--) {
      this.fullBodyOutline.push({
        x: leftLegPointsArr[i].x,
        y: leftLegPointsArr[i].y,
      });
    }

    // // Curve along the bottom of the neck
    for (let i = 0; i < 1; i += this.lerpValue) {
      this.fullBodyOutline.push(
        lerpCurve(
          [leftLegPointsArr[0].x, leftLegPointsArr[0].y],
          [
            bodyPointsArr[0].x - this.fullOutlineParams.body.bustPoint.x,
            bodyPointsArr[0].y,
          ],
          [
            headPointsArr[Math.floor(headPointsArr.length / 4 - 1)].x,
            headPointsArr[Math.floor(headPointsArr.length / 4 - 1)].y,
          ],
          i
        )
      );
    }

    // // Arc around the bottom of the head
    for (
      let i = Math.floor(this.fullOutlineParams.head.pointsArr.length / 4);
      i >= 0;
      i--
    ) {
      this.fullBodyOutline.push({
        x: this.fullOutlineParams.head.pointsArr[i].x,
        y: this.fullOutlineParams.head.pointsArr[i].y,
      });
    }

    // // Head Outline
    for (let i = 0; i < this.fullOutlineParams.head.cutOff.top; i++) {
      this.headOutlineTopRow.push(this.fullBodyOutline[i]);
    }

    for (let i = this.fullOutlineParams.head.cutOff.bottom; i > 0; i--) {
      this.headOutlineBottomRow.push(
        this.fullBodyOutline[this.fullBodyOutline.length - 1 - i]
      );
    }

    // // Connecting Line functions
    this.headConnectingLine.top = {
      x: this.headOutlineTopRow[this.headOutlineTopRow.length - 1].x,
      y: this.headOutlineTopRow[this.headOutlineTopRow.length - 1].y,
    };

    this.headConnectingLine.bottom = {
      x: this.headOutlineBottomRow[0].x,
      y: this.headOutlineBottomRow[0].y,
    };

    for (let i = 0; i < 1; i += this.lerpValue) {
      this.headConnectingRow.push(
        lerpLine(
          [this.headConnectingLine.top.x, this.headConnectingLine.top.y],
          [this.headConnectingLine.bottom.x, this.headConnectingLine.bottom.y],
          i
        )
      );
    }

    for (let i = 0; i < this.headOutlineTopRow.length; i++) {
      this.headOutline.push(this.headOutlineTopRow[i]);
    }

    for (let i = 0; i < this.headConnectingRow.length; i++) {
      if (i % 2 === 0) {
        this.headOutline.push({
          x: this.headConnectingRow[i].x,
          y: this.headConnectingRow[i].y,
        });
      } else {
        this.headOutline.push({
          x:
            this.headConnectingRow[i].x +
            this.fullOutlineParams.head.ridgeOff.x,
          y:
            this.headConnectingRow[i].y +
            this.fullOutlineParams.head.ridgeOff.y,
        });
      }
    }

    for (let i = 0; i < this.headOutlineBottomRow.length; i++) {
      this.headOutline.push(this.headOutlineBottomRow[i]);
    }
  }

  renderOutline(outline) {
    c.save();
    c.beginPath();
    c.moveTo(outline[0].x, outline[0].y);
    for (let i = 0; i < outline.length; i++) {
      c.lineTo(outline[i].x, outline[i].y);
    }
    c.lineTo(outline[outline.length - 1].x, outline[outline.length - 1].y);
    c.stroke();
    c.clip();
  }

  plotGrid(gridArr, spacingX, spacingY) {
    let headPointsArr = this.fullOutlineParams.head.pointsArr;
    let leftLegPointsArr = this.fullOutlineParams.leftLeg.pointsArr;
    let tailPointsArr = this.fullOutlineParams.tail.pointsArr;

    let topLine = {
      start: {
        x:
          headPointsArr[Math.floor(headPointsArr.length * 0.5)].x -
          this.fullOutlineParams.body.bustPoint.x -
          this.fullOutlineParams.body.size,
        y:
          headPointsArr[Math.floor(headPointsArr.length * 0.25)].y -
          this.fullOutlineParams.body.bustPoint.y -
          this.fullOutlineParams.body.size,
      },
      end: {
        x:
          tailPointsArr[Math.floor(tailPointsArr.length * 0.5)].x +
          this.fullOutlineParams.body.caboosePoint.x +
          this.fullOutlineParams.body.size,
        y:
          headPointsArr[Math.floor(headPointsArr.length * 0.25)].y -
          this.fullOutlineParams.body.bustPoint.y -
          this.fullOutlineParams.body.size,
      },
    };

    let bottomLine = {
      start: {
        x:
          headPointsArr[Math.floor(headPointsArr.length * 0.5)].x -
          this.fullOutlineParams.body.bustPoint.x -
          this.fullOutlineParams.body.size,
        y:
          leftLegPointsArr[Math.floor(leftLegPointsArr.length - 1)].y +
          this.fullOutlineParams.leftLeg.size,
      },
      end: {
        x:
          tailPointsArr[Math.floor(tailPointsArr.length * 0.5)].x +
          this.fullOutlineParams.body.caboosePoint.x +
          this.fullOutlineParams.body.size,
        y:
          leftLegPointsArr[Math.floor(leftLegPointsArr.length - 1)].y +
          this.fullOutlineParams.leftLeg.size,
      },
    };

    let topRow = [];
    let bottomRow = [];

    for (let i = 0; i < 1; i += spacingX) {
      topRow.push(
        lerpLine(
          [topLine.start.x, topLine.start.y],
          [topLine.end.x, topLine.end.y],
          i
        )
      );
    }
    for (let i = 1; i > 0; i -= spacingY) {
      bottomRow.push(
        lerpLine(
          [bottomLine.start.x, bottomLine.start.y],
          [bottomLine.end.x, bottomLine.end.y],
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

      for (let q = 1; q > 0; q -= this.lerpValue) {
        gridArr.push(
          lerpLine(
            [topRowPoint.x, topRowPoint.y],
            [bottomRowPoint.x, bottomRowPoint.y],
            q
          )
        );
      }
    }
    for (let i = 0; i < gridArr.length; i++) {
      c.beginPath();
      makePolygon(
        gridArr[i].x,
        gridArr[i].y,
        Math.random() * 8,
        Math.random() * 10,
        null,
        `lightyellow`,
        true
      );
      c.stroke();
    }
  }

  renderBeak() {
    if (this.resolution >= 4) {
      let beakPoints = {
        center: {
          start: {
            x: this.fullOutlineParams.head.pointsArr[
              Math.floor(this.fullOutlineParams.head.pointsArr.length / 2)
            ].x,
            y: this.fullOutlineParams.head.pointsArr[
              Math.floor(this.fullOutlineParams.head.pointsArr.length / 2)
            ].y,
          },
          end: {
            x:
              this.fullOutlineParams.head.pointsArr[0].x +
              this.beakParams.length,
            y: this.fullOutlineParams.head.pointsArr[0].y,
          },
        },
        top: {
          start: {
            x: this.fullOutlineParams.head.pointsArr[
              Math.floor(
                this.fullOutlineParams.head.pointsArr.length -
                  this.beakParams.topCutoff
              )
            ].x,
            y: this.fullOutlineParams.head.pointsArr[
              Math.floor(
                this.fullOutlineParams.head.pointsArr.length -
                  this.beakParams.topCutoff
              )
            ].y,
          },
          end: {
            x:
              this.fullOutlineParams.head.pointsArr[0].x +
              this.beakParams.length,
            y: this.fullOutlineParams.head.pointsArr[0].y,
          },
        },
      };

      // Draw Top Beak
      c.beginPath();
      c.bezierCurveTo(
        beakPoints.center.start.x + this.beakParams.centerCurveOffsets.cp1.x,
        beakPoints.center.start.y + this.beakParams.centerCurveOffsets.cp1.y,
        beakPoints.center.start.x + this.beakParams.centerCurveOffsets.cp2.x,
        beakPoints.center.start.y + this.beakParams.centerCurveOffsets.cp2.y,
        beakPoints.center.end.x + this.beakParams.centerCurveOffsets.cp3.x,
        beakPoints.center.end.y + this.beakParams.centerCurveOffsets.cp3.y
      );
      c.bezierCurveTo(
        beakPoints.top.end.x + this.beakParams.topCurveOffsets.cp1.x,
        beakPoints.top.end.y + this.beakParams.topCurveOffsets.cp1.y,
        beakPoints.center.start.x + this.beakParams.topCurveOffsets.cp2.x,
        beakPoints.center.start.y + this.beakParams.topCurveOffsets.cp2.y,
        beakPoints.top.start.x + this.beakParams.centerCurveOffsets.cp3.x,
        beakPoints.top.start.y + this.beakParams.topCurveOffsets.cp3.y
      );
      c.lineTo(beakPoints.center.start.x, beakPoints.center.start.y);
      c.fill();
      c.stroke();
    }
  }

  renderFeet() {
    let legsArr = [
      this.fullOutlineParams.leftLeg,
      this.fullOutlineParams.rightLeg,
    ];
    let numToes = Math.floor(Math.random() * (5 - 2) + 2);
    c.beginPath();
    for (let i = 0; i < 2; i++) {
      c.moveTo(
        this.xPos + legsArr[i].posOffset.x,
        this.yPos + legsArr[i].posOffset.y
      );
      c.lineTo(
        this.xPos + legsArr[i].posOffset.x,
        this.yPos +
          legsArr[i].posOffset.y +
          this.fullOutlineParams.leftLeg.length
      );
      for (let j = 0; j < numToes; j++) {
        c.moveTo(
          this.xPos + legsArr[i].posOffset.x,
          this.yPos +
            legsArr[i].posOffset.y +
            this.fullOutlineParams.leftLeg.length
        );
        c.lineTo(
          this.xPos + legsArr[i].posOffset.x - 35,
          this.yPos +
            legsArr[i].posOffset.y +
            this.fullOutlineParams.leftLeg.length +
            5 * j
        );
      }
    }
    c.stroke();
  }

  renderFrame() {
    c.fillStyle = "rgba(255, 255, 248, .9)";
    c.beginPath();
    c.rect(
      this.xPos - this.frameWidth / 2,
      this.yPos - this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight
    );
    c.fill();
    c.stroke();
  }

  render() {
    c.strokeStyle = "rgba(0, 0, 255, 0)";
    this.renderFrame();
    this.clearOutlines();

    c.strokeStyle = "blue";
    c.lineWidth = 1;
    this.setupGuides();
    c.fillStyle = "orange";
    this.renderBeak();

    this.renderFeet();

    c.fillStyle = "rgba(255, 255, 255, .75)";
    this.plotOutlines();
    this.renderOutline(this.fullBodyOutline);

    c.fill();

    this.plotGrid(this.bodyGrid, this.lerpValue, this.lerpValue);

    c.restore();
    c.moveTo(0, 0);

    c.fillStyle = "rgba(255, 225, 245, .8)";
    this.renderOutline(this.headOutline);
    c.fill();
    c.stroke();
    c.restore();

    c.fillStyle = "rgba(0, 0, 0, 0)";
    this.renderOutline(this.fullBodyOutline);

    c.fill();
    c.restore();

    this.renderOutline(this.headOutline);
    c.restore();
  }
}
