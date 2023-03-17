let opacity = "1";
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
      type: "slider",
      label: "Resolution",
      value: 20,
      range: { min: 1, max: 20 },
    },
    layout: {
      type: "slider",
      label: "Layout",
      subLabels: { 1: "Cols", 2: "Rows" },
      value: { cols: 1, rows: 1 },
      range: { min: 1, max: 5 },
    },
  },
  head: {
    sectionLabel: "Head",
    size: {
      label: "Head Size",
      value: 20,
      min: 1,
      max: 50,
    },
    posOffset: {
      label: "Position",
      value: { x: -80, y: -200 },
      min: 1,
      max: 20,
    },
    cutOff: {
      label: "Cutoff Point",
      value: { top: 20, bottom: 20 },
    },
    ridgeOff: {
      label: "Head Ridges",
      value: { x: 5, y: 5 },
    },
  },
  beak: {
    sectionLabel: "Beak",
  },
  body: {
    sectionLabel: "Body",
    size: {
      label: "Body Size",
      value: 80,
      min: 1,
      max: 250,
    },
    posOffset: {
      label: "Position",
      value: { x: 0, y: 0 },
    },
    caboosePoint: {
      label: "Caboose Point",
      value: { x: 50, y: 20 },
    },
    bustPoint: {
      label: "Bust Point",
      value: { x: 60, y: 0 },
    },
  },
  leg: {
    sectionLabel: "Legs",
    size: {
      label: "Leg Size",
      value: 20,
      min: 1,
      max: 50,
    },
    posOffset: {
      label: "Position",
      value: { x: 30, y: 50 },
    },
    length: {
      label: "Length",
      value: 60,
      min: 1,
      max: 250,
    },
  },
  tail: {
    sectionLabel: "Tail",
  },
};
