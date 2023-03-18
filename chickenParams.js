let opacity = ".25";
let palette1 = [
  `rgba(61, 61, 61, ${opacity})`,
  `rgba(1, 138, 158, ${opacity})`,
  `rgba(28, 27, 25, ${opacity})`,
  `rgba(82, 156, 209, ${opacity})`,
  `rgba(112, 83, 103, ${opacity})`,
  `rgba(159, 215, 203, ${opacity})`,
  `rgba(188, 155, 186, ${opacity})`,
  `rgba(212, 121, 77, ${opacity})`,
  `rgba(241, 201, 132, ${opacity})`,
  `rgba(245, 120, 118, ${opacity})`,
  `rgba(245, 130, 63, ${opacity})`,
  `rgba(251, 247, 236, ${opacity})`,
  `rgba(254, 216, 47, ${opacity})`,
];

let chickenParams = {
  majorParams: {
    sectionLabel: "Main",
    resolution: {
      type: "slider-one-axis",
      objMap: ["resolution"],
      label: "Resolution",
      value: 20,
      range: { min: 3, max: 20 },
    },
    layout: {
      type: "slider-two-axes",
      label: "Layout",
      subLabels: { 1: "Cols", 2: "Rows" },
      value: { cols: 1, rows: 1 },
      range: { min: 1, max: 5 },
    },
  },
  head: {
    sectionLabel: "Head",
    size: {
      type: "slider-one-axis",
      label: "Head Size",
      objMap: ["obj", "head", "size"],
      value: 20,
      range: { min: 1, max: 100 },
    },
    posOffset: {
      type: "slider-two-axes",
      label: "Position",
      subLabels: { 1: "X Off", 2: "Y Off" },
      objMap: [
        ["obj", "head", "posOffset", "x"],
        ["obj", "head", "posOffset", "y"],
      ],
      value: { x: -80, y: -200 },
      range: { min: -250, max: 250 },
    },
    cutOff: {
      type: "slider-two-axes",
      label: "Cutoff Point",
      subLabels: { 1: "top", 2: "bottom" },
      objMap: [
        ["obj", "head", "cutOff", "top"],
        ["obj", "head", "cutOff", "bottom"],
      ],
      value: { top: 20, bottom: 20 },
      range: { min: 1, max: 40 },
    },
    neckCurve: {
      type: "slider-two-axes",
      label: "Neck Curve",
      subLabels: { 1: "x", 2: "y" },
      objMap: [
        ["obj", "head", "neckCurve", "x"],
        ["obj", "head", "neckCurve", "y"],
      ],
      value: { x: 0, y: -75 },
      range: { min: -100, max: 100 },
    },
    ridgeOff: {
      type: "slider-two-axes",
      label: "Head Ridge Offset",
      subLabels: { 1: "xOff", 2: "yOff" },
      objMap: [
        ["obj", "head", "ridgeOff", "x"],
        ["obj", "head", "ridgeOff", "y"],
      ],
      value: { x: 5, y: 5 },
      range: { min: -50, max: 50 },
    },
    ridgeLerp: {
      type: "slider-one-axis",
      label: "Ridge Lerp",
      objMap: ["obj", "head", "ridgeLerp"],
      value: 5,
      range: { min: 1, max: 100 },
    },
  },
  beak: {
    sectionLabel: "Beak",
  },
  body: {
    sectionLabel: "Body",
    size: {
      type: "slider-one-axis",
      label: "Body Size",
      objMap: ["obj", "body", "size"],
      value: 80,
      range: { min: 1, max: 250 },
    },
    posOffset: {
      type: "slider-two-axes",
      label: "Position",
      subLabels: { 1: "xOff", 2: "yOff" },
      objMap: [
        ["obj", "body", "posOffset", "x"],
        ["obj", "body", "posOffset", "y"],
      ],
      value: { x: 0, y: 0 },
      range: { min: -50, max: 50 },
    },
    caboosePoint: {
      type: "slider-two-axes",
      label: "Caboose Point",
      subLabels: { 1: "x", 2: "y" },
      objMap: [
        ["obj", "body", "caboosePoint", "x"],
        ["obj", "body", "caboosePoint", "y"],
      ],
      value: { x: 50, y: 20 },
      range: { min: -150, max: 150 },
    },
    bustPoint: {
      type: "slider-two-axes",
      label: "Bust Point",
      subLabels: { 1: "x", 2: "y" },
      objMap: [
        ["obj", "body", "bustPoint", "x"],
        ["obj", "body", "bustPoint", "y"],
      ],
      value: { x: 60, y: 20 },
      range: { min: -150, max: 150 },
    },
  },
  leg: {
    sectionLabel: "Legs",
    size: {
      type: "slider-one-axis",
      label: "Leg Size",
      objMap: ["obj", ["leftLeg", "rightLeg"], "size"],
      value: 20,
      range: { min: 1, max: 50 },
    },
    posOffset: {
      type: "slider-two-axes",
      label: "Position",
      subLabels: { 1: "x", 2: "y" },
      objMap: [
        ["obj", ["leftLeg", "rightLeg"], "posOffset", "x"],
        ["obj", ["leftLeg", "rightLeg"], "posOffset", "y"],
      ],
      value: { x: 30, y: 50 },
      range: { min: 0, max: 150 },
    },
    length: {
      type: "slider-one-axis",
      label: "Length",
      objMap: ["obj", ["leftLeg", "rightLeg"], "length"],
      value: 60,
      range: { min: 1, max: 250 },
    },
  },
  tail: {
    sectionLabel: "Tail",
  },
};
