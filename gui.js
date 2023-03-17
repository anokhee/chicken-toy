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

let selectedChickenId = 0;
let selectedChicken;

function createGUI(chickenArr) {
  selectedChicken = chickenArr[selectedChickenId];

  switchControlPanel(selectedChicken, selectedMenuItem);
  createLeftHandMenu(selectedChicken, selectorMenu);

  for (let eachChicken in chickenArr) {
    let chicken = chickenArr[eachChicken];
    populateChickenToDropdown(chicken, chickenSelector);
  }

  chickenSelector.addEventListener("input", function () {
    for (const chickenIndex in chickenArr) {
      selectedChickenId = this.value;
      if (selectedChickenId == chickenArr[chickenIndex].id) {
        selectedChicken = chickenArr[chickenIndex];

        switchControlPanel(selectedChicken, selectedMenuItem);
        createLeftHandMenu(selectedChicken, selectorMenu);
      }
    }
  });
}

function populateChickenToDropdown(chicken, select) {
  let option = document.createElement("option");
  option.value = chicken.id;
  option.innerHTML = `Chicken ${chicken.id}`;

  select.appendChild(option);
}

function switchControlPanel(chicken, selectedMenu) {
  rightHandPanel.innerHTML = "";

  let heading = document.createElement("h2");
  heading.innerHTML = `Chicken #${chicken.id}`;

  let subHeading = document.createElement("h3");
  subHeading.innerHTML = chickenParams[selectedMenu].sectionLabel;

  rightHandPanel.appendChild(heading);
  rightHandPanel.appendChild(subHeading);

  for (const section in chickenParams[selectedMenu]) {
    if (section != "sectionLabel") {
      createSlider(chicken, section, selectedMenu, rightHandPanel);
    }
  }
}

function createLeftHandMenu(chicken, container) {
  container.innerHTML = "";

  for (const eachParam in chickenParams) {
    let thisItem = chickenParams[eachParam];
    let selectorContainer = document.createElement("div");
    selectorContainer.className = "lefthand-selector-container";

    let selectorLabel = document.createElement("p");
    selectorLabel.innerHTML = `${thisItem.sectionLabel}`;

    selectorContainer.appendChild(selectorLabel);
    container.appendChild(selectorContainer);

    selectorContainer.addEventListener("click", function () {
      selectedChickenId = chicken.id;

      selectedMenuItem = eachParam;
      switchControlPanel(chicken, selectedMenuItem);
    });
  }
}

function createSlider(chicken, param, selectedMenu, container) {
  let test = document.createElement("p");
  let range = document.createElement("input");
  test.innerHTML = chickenParams[selectedMenu][param].label;

  //   test.innerHTML = `${chickenParams[param].label}`;

  for (const eachSection in chickenParams[selectedMenu]) {
    let section = chickenParams[selectedMenu][eachSection];
    if (section.label != undefined) {
      range.type = "range";
      range.min = 0;
      range.max = 10;
    }

    container.appendChild(test);
    container.appendChild(range);

    range.addEventListener("input", function () {
      setChickenValues(selectedChickenId, param, this.value);
    });
  }
}
