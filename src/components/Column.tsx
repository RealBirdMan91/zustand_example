import "./Column.css";
import Task from "./Task";
import { TaskState, useStore } from "../lib/store";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

function Column({ state }: { state: TaskState }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    useShallow((storeState) =>
      storeState.tasks.filter((task) => task.state === state)
    )
  );

  const addTask = useStore((storeState) => storeState.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrop(true);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (draggedTask) {
      moveTask(draggedTask, state);
      setDraggedTask(null);
      setDrop(false);
    }
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrop(false);
  }

  return (
    <div
      className={`column ${drop ? "drop" : ""}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(!open)}>Add</button>
      </div>
      {tasks.map((task, index) => (
        <Task key={index} title={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              autoFocus
            />
            <button
              onClick={() => {
                addTask({ title: text, state });
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;
