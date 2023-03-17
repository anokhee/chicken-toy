class Chicken {
  constructor(id, xPos, yPos, frameWidth, frameHeight) {
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.resolution = chickenParams.majorParams.resolution.value;
    this.lerpValue = 0.08;

    // Customizable with GUI

    this.obj = {
      head: {
        size: chickenParams.head.size.value,
        posOffset: {
          x: chickenParams.head.posOffset.value.x,
          y: chickenParams.head.posOffset.value.y,
        },
        pointsArr: [],

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
      },
      rightLeg: {
        size: chickenParams.leg.size.value,
        posOffset: {
          x: chickenParams.leg.posOffset.value.x,
          y: chickenParams.leg.posOffset.value.y,
        },
        pointsArr: [],
        length: chickenParams.leg.length.value,
      },
      leftLeg: {
        size: chickenParams.leg.size.value,
        posOffset: {
          x: -chickenParams.leg.posOffset.value.x,
          y: chickenParams.leg.posOffset.value.y,
        },
        pointsArr: [],
        length: chickenParams.leg.length.value,
      },
      tail: {
        size: 5,
        posOffset: { x: 150, y: -105 },
        pointsArr: (this.tailPoints = []),
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
  }

  setupGuides(show) {
    for (const eachPart in this.obj) {
      let part = this.obj[eachPart];
      makePolygon(
        this.xPos + part.posOffset.x,
        this.yPos + part.posOffset.y,
        part.size,
        this.resolution,
        part.pointsArr,
        "white",
        show
      );
    }

    this.headPointsArr = this.obj.head.pointsArr;
    this.bodyPointsArr = this.obj.body.pointsArr;
    this.rightLegPointsArr = this.obj.rightLeg.pointsArr;
    this.leftLegPointsArr = this.obj.leftLeg.pointsArr;
    this.tailPointsArr = this.obj.tail.pointsArr;

    this.allPointsArr = {
      head: this.headPointsArr,
      body: this.bodyPointsArr,
      rightLeg: this.rightLegPointsArr,
      leftLeg: this.leftLegPointsArr,
      tail: this.tailPointsArr,
    };
  }

  clearOutlines() {
    this.fullBodyOutline = [];
    this.obj.head.pointsArr = [];
    this.obj.body.pointsArr = [];

    this.headOutline = [];
    this.headOutlineTopRow = [];
    this.headOutlineBottomRow = [];

    this.obj.rightLeg.pointsArr = [];
    this.obj.leftLeg.pointsArr = [];

    this.bodyGrid = [];
    // this.headGrid = [];
  }

  renderOutline(outline, color, lineWidth) {
    c.strokeStyle = color;
    c.lineWidth = lineWidth;

    c.save();
    c.beginPath();
    c.moveTo(outline[0].x, outline[0].y);
    for (let i = 0; i < outline.length - 2; i++) {
      c.lineTo(outline[i].x, outline[i].y);
    }
    c.lineTo(outline[outline.length - 1].x, outline[outline.length - 1].y);
    c.stroke();
    c.clip();
  }

  renderPattern(grid) {
    for (let i = 0; i < grid.length; i++) {
      c.beginPath();
      makePolygon(grid[i].x, grid[i].y, 10, 10, null, "lightyellow", true);
      c.stroke();
    }
  }

  renderBeak() {
    if (this.resolution >= 4) {
      let beakPoints = {
        center: {
          start: {
            x: this.obj.head.pointsArr[0].x,
            y: this.obj.head.pointsArr[
              Math.floor(this.obj.head.pointsArr.length / 2)
            ].y,
          },
          end: {
            x: this.obj.head.pointsArr[0].x + this.beakParams.length,
            y: this.obj.head.pointsArr[0].y,
          },
        },
        top: {
          start: {
            x: this.obj.head.pointsArr[
              Math.floor(
                this.obj.head.pointsArr.length - this.beakParams.topCutoff
              )
            ].x,
            y: this.obj.head.pointsArr[
              Math.floor(
                this.obj.head.pointsArr.length - this.beakParams.topCutoff
              )
            ].y,
          },
          end: {
            x: this.obj.head.pointsArr[0].x + this.beakParams.length,
            y: this.obj.head.pointsArr[0].y,
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
    let legsArr = [this.obj.leftLeg, this.obj.rightLeg];
    let numToes = Math.floor(Math.random() * (5 - 2) + 2);
    c.beginPath();
    for (let i = 0; i < 2; i++) {
      c.moveTo(
        this.xPos + legsArr[i].posOffset.x,
        this.yPos + legsArr[i].posOffset.y
      );
      c.lineTo(
        this.xPos + legsArr[i].posOffset.x,
        this.yPos + legsArr[i].posOffset.y + this.obj.leftLeg.length
      );
      for (let j = 0; j < numToes; j++) {
        c.moveTo(
          this.xPos + legsArr[i].posOffset.x,
          this.yPos + legsArr[i].posOffset.y + this.obj.leftLeg.length
        );
        c.lineTo(
          this.xPos + legsArr[i].posOffset.x - 35,
          this.yPos + legsArr[i].posOffset.y + this.obj.leftLeg.length + 5 * j
        );
      }
    }
    c.stroke();
  }

  renderFrame() {
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

  clearFill() {
    c.fillStyle = c.fillStyle = "rgba(0, 0, 0, 0)";
  }

  render() {
    this.clearOutlines();

    c.fillStyle = "white";
    this.renderFrame();

    this.setupGuides(true);
    plotOutlines(
      this.obj,
      this.allPointsArr,
      this.fullBodyOutline,
      this.headOutline,
      this.lerpValue
    );
    plotGrids(this.obj, this.allPointsArr, this.bodyGrid, this.lerpValue);

    this.renderBeak();
    this.renderFeet();

    c.fillStyle = "rgba(0, 0, 255, .05)";
    this.renderOutline(this.fullBodyOutline, "blue", 1);
    c.fill();
    this.renderPattern(this.bodyGrid);
    c.restore();

    c.fillStyle = "rgba(255, 255, 255, 1)";
    this.renderOutline(this.headOutline, "blue", 1);
    c.fill();
    c.restore();

    this.renderOutline(this.headOutline);
    c.restore();

    this.renderOutline(this.fullBodyOutline);
    c.restore();
  }
}
