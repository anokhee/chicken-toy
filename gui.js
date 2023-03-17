let controlPanel = document.getElementById("controlPanel");
let controlPanelHeader = document.getElementById("controlPanelHeader");
let topMenu = document.getElementById("topMenu");
let panelsContainer = document.getElementById("allControlsContainer");
let leftHandMenu = document.getElementById("leftHandMenu");

let chickenSelectorContainer = document.getElementById(
  "chickenSelectorContainer"
);
let chickenSelector = document.getElementById("chickenSelector");

let selectorMenu = document.getElementById("selectorMenu");
let rightHandPanel = document.getElementById("rightHandPanel");
let selectedMenuItem = "majorParams";

let selectedChicken;

function createGUI(chickenArr) {
  selectedChicken = chickenArr[0];
  createRightHandPanel(selectedChicken);

  for (let chickenId in chickenArr) {
    populateChickenToDropdown(chickenId, chickenSelector);
  }

  chickenSelector.addEventListener("input", function () {
    selectedChicken = chickenArr[this.value - 1];
    createRightHandPanel(selectedChicken);
  });
}

function populateChickenToDropdown(chickenId, select) {
  let option = document.createElement("option");
  option.value = chickenArr[chickenId].id;
  option.innerHTML = `Chicken ${parseInt(chickenId) + 1}`;

  select.appendChild(option);
  return chickenId;
}

function createRightHandPanel(chicken) {
  selectorMenu.innerHTML = "";
  rightHandPanel.innerHTML = "";
  let heading = document.createElement("h2");
  heading.innerHTML = `Chicken ` + chicken.id;
  rightHandPanel.appendChild(heading);

  for (const eachSection in chickenParams) {
    let section = chickenParams[eachSection];
    let sectionContainer = document.createElement("div");
    sectionContainer.className = "menu-section-container";
    sectionContainer.style.display = "hidden";

    let sectionHeader = document.createElement("h3");
    sectionHeader.innerHTML = `${section.sectionLabel}`;

    rightHandPanel.appendChild(sectionContainer);
    sectionContainer.appendChild(sectionHeader);
    sectionContainer.style.display = "none";

    for (const eachSubsection in chickenParams[eachSection]) {
      let subsection = chickenParams[eachSection][eachSubsection];
      if (subsection.label != undefined) {
        let subsectionContainer = document.createElement("div");
        subsectionContainer.className = "menu-subsection-container";

        let subsectionHeader = document.createElement("h4");
        subsectionHeader.innerHTML = `${subsection.label}`;

        sectionContainer.appendChild(subsectionContainer);
        subsectionContainer.appendChild(subsectionHeader);
        generateSlider(
          chicken.id,
          subsection.type,
          subsection,
          subsection.objMap,
          subsectionContainer
        );
      }
    }

    let menuSelectorContainer = document.createElement("div");
    menuSelectorContainer.className = "menu-selector";

    let menuLabel = document.createElement("p");
    menuLabel.innerHTML = `${section.sectionLabel}`;

    menuSelectorContainer.appendChild(menuLabel);
    selectorMenu.appendChild(menuSelectorContainer);

    menuSelectorContainer.addEventListener("click", function () {
      rightHandPanel.innerHTML = "";
      rightHandPanel.appendChild(sectionContainer);
      sectionContainer.style.display = "block";
      this.classList.add("selected");
    });
  }
}

// NEEDS REFACTORING O____O
function generateSlider(chickenId, type, subsection, objMap, container) {
  if (type === "slider-one-axis") {
    let slider = document.createElement("input");
    slider.type = "range";
    slider.min = subsection.range.min;
    slider.max = subsection.range.max;
    slider.value = subsection.value;
    slider.step = 0.01;

    slider.addEventListener("input", function () {
      setChickenValues(chickenId, subsection, objMap, this.value);
    });

    container.appendChild(slider);
  }
  if (type === "slider-two-axes") {
    let slidersContainer = document.createElement("div");
    slidersContainer.className = "split-sliders-container";

    let splitContainer1 = document.createElement("div");
    splitContainer1.className = "split-slider-container";

    let sliderLabel1 = document.createElement("p");
    sliderLabel1.innerHTML = `${Object.entries(subsection.value)[0][0]}`;

    let slider1 = document.createElement("input");
    slider1.type = "range";
    slider1.value = Object.entries(subsection.value)[0][1];
    slider1.min = subsection.range.min;
    slider1.max = subsection.range.max;
    slider1.value = subsection.value;

    splitContainer1.appendChild(sliderLabel1);
    splitContainer1.appendChild(slider1);

    slider1.addEventListener("input", function () {
      setChickenValues(chickenId, subsection, objMap[0], this.value);
    });

    //

    let splitContainer2 = document.createElement("div");
    splitContainer2.className = "split-slider-container";

    let sliderLabel2 = document.createElement("p");
    sliderLabel2.innerHTML = `${Object.entries(subsection.value)[1][0]}`;

    let slider2 = document.createElement("input");
    slider2.type = "range";
    slider2.value = Object.entries(subsection.value)[1][1];
    slider2.min = subsection.range.min;
    slider2.max = subsection.range.max;
    slider2.value = subsection.value;

    splitContainer2.appendChild(sliderLabel2);
    splitContainer2.appendChild(slider2);

    slidersContainer.appendChild(splitContainer1);
    slidersContainer.appendChild(splitContainer2);

    slider2.addEventListener("input", function () {
      setChickenValues(chickenId, subsection, objMap[1], this.value);
    });

    container.appendChild(slidersContainer);
  }
}
