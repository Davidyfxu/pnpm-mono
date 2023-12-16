import "./App.css";
import { useEffect } from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Note";
import VisibilityFilter from "./components/VisibilityFilter";
import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/noteReducer";

function Chapter6() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div className="App">
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
}

export default Chapter6;
