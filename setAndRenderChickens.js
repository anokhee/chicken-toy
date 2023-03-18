let renderChickens = () => {
  for (let i = 0; i < chickenArr.length; i++) {
    chickenArr[i].render(0, 0);
  }
};

let setChickenValues = (chickenId, subsection, objMap, newVal) => {
  chickenId = chickenId - 1;
  if (objMap.length === 1) {
    chickenArr[chickenId][objMap] = parseInt(newVal);
  }
  if (objMap.length === 3) {
    if (typeof objMap[1] != "string") {
      chickenArr[chickenId][objMap[0]][objMap[1][0]][objMap[2]] =
        parseInt(newVal);
      chickenArr[chickenId][objMap[0]][objMap[1][1]][objMap[2]] =
        parseInt(newVal);
    } else {
      if (objMap[2] === "ridgeLerp") {
        chickenArr[chickenId][objMap[0]][objMap[1]][objMap[2]] = parseFloat(
          newVal * 0.01
        );
      }
      chickenArr[chickenId][objMap[0]][objMap[1]][objMap[2]] = parseInt(newVal);
    }
  }
  if (objMap.length === 4) {
    if (typeof objMap[1] != "string") {
      if (objMap[3] === "x") {
        chickenArr[chickenId][objMap[0]][objMap[1][0]][objMap[2]][objMap[3]] =
          -parseInt(newVal);
        chickenArr[chickenId][objMap[0]][objMap[1][1]][objMap[2]][objMap[3]] =
          parseInt(newVal);
      } else {
        chickenArr[chickenId][objMap[0]][objMap[1][0]][objMap[2]][objMap[3]] =
          parseInt(newVal);
        chickenArr[chickenId][objMap[0]][objMap[1][1]][objMap[2]][objMap[3]] =
          parseInt(newVal);
      }
    } else
      chickenArr[chickenId][objMap[0]][objMap[1]][objMap[2]][objMap[3]] =
        parseInt(newVal);
  }

  renderChickens();
};
