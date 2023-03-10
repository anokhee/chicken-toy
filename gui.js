let renderChickens = () => {
  for (let i = 0; i < chickenArr.length; i++) {
    chickenArr[i].render(0, 0);
  }
};

let setChickenValues = (chicken, a, b, c, newVal) => {
  if (b != null && c != null) {
    chicken[a][b][c] = newVal;
  } else if (a === "resolution") {
    chicken.resolution = newVal;
  }

  renderChickens();
};

let chickenParams = {
  majorParams: {
    resolution: {
      label: "Resolution",
      value: 20,
      min: 2,
      max: 30,
    },
  },
  head: {
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
      value: { x: 10, y: 10 },
    },
  },
  body: {
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
    size: {
      label: "Leg Size",
      value: 20,
      min: 1,
      max: 50,
    },
    posOffset: {
      label: "Position",
      value: { x: 40, y: 50 },
    },
    length: {
      label: "Length",
      value: 60,
      min: 1,
      max: 250,
    },
  },
};

let controlPanel = document.getElementById("mydiv");
let controlsContainer = document.getElementById("controlsContainer");

function generateGUI(func, chickenArr) {
  controlPanel.style.display = "block";
  controlsContainer.style.border = "1px solid black";
  let slider;

  for (let i = 0; i < chickenArr.length; i++) {
    let individualChickenControlsContainer = document.createElement("div");
    individualChickenControlsContainer.style.border = "1px solid black";

    let individualChickenControlsContainerLabel = document.createElement("p");
    individualChickenControlsContainerLabel.innerHTML = `${i}th Chicken`;
    individualChickenControlsContainerLabel.style.textAlign = "center";

    // Append children to container
    individualChickenControlsContainer.appendChild(
      individualChickenControlsContainerLabel
    );

    controlsContainer.appendChild(individualChickenControlsContainer);

    for (const eachSection in chickenParams) {
      for (const eachPart in chickenParams[eachSection]) {
        let item = chickenParams[eachSection][eachPart];
        slider = generateSlider(i, eachSection, eachPart, item);
        controlsContainer.appendChild(slider);
      }
    }
  }
}

function generateSlider(index, section, part, parameter) {
  let sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-container";
  let slider = document.createElement("input");
  slider.type = "range";
  slider.min = chickenParams[section][part].min;
  slider.max = chickenParams[section][part].max;
  slider.value = parameter.value;
  let sliderLabel = document.createElement("p");

  if (typeof parameter.value === "object" && parameter !== null) {
    sliderContainer.appendChild(sliderLabel);
    for (const objectPair in parameter.value) {
      let subLabel = document.createElement("p");
      sliderLabel.innerHTML = `${parameter.label}:`;
      subLabel.innerHTML = `${objectPair}: ${parameter.value[objectPair]}`;
      sliderContainer.appendChild(subLabel);
    }
  } else {
    sliderLabel.innerHTML = `${chickenParams[section][part].label}`;
    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(slider);
  }

  slider.addEventListener("input", function () {
    if (section === "majorParams") {
      let a = "resolution";
      setChickenValues(chickenArr[index], a, null, null, this.value);
    }
    if (section === "head" || section === "body" || section === "leg") {
      let a = "fullOutlineParams";
      let b = section;
      let c = part;
      console.log(section);
      if (section === "leg") {
        setChickenValues(chickenArr[index], a, "leftLeg", c, this.value * 1);
        setChickenValues(chickenArr[index], a, "rightLeg", c, this.value * 1);
      } else {
        setChickenValues(chickenArr[index], a, b, c, this.value);
      }
    }
  });

  return sliderContainer;
}

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
