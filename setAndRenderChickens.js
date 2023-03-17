let renderChickens = () => {
  for (let i = 0; i < chickenArr.length; i++) {
    chickenArr[i].render(0, 0);
  }
};

let setChickenValues = (chickenID, a, newVal) => {
  chickenArr[chickenID - 1][a] = newVal;
  renderChickens();
};
