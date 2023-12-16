interface Action {
  type: "ADD" | "SUB";
}
const CounterReducer = (state: number, action: Action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "SUB":
      return state - 1;
  }
};
export default CounterReducer;
