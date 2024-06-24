import { useStore } from "../lib/store";
import "./Task.css";
import React from "react";
import trash from "../assets/trash.svg";

function Task({ title }: { title: string }) {
  const task = useStore((storeState) =>
    storeState.tasks.find((task) => task.title === title)
  );

  const setDraggedTask = useStore((storeState) => storeState.setDraggedTask);

  const deleteTask = useStore((storeState) => storeState.deleteTask);
  if (!task) return null;

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(title)}>
      {task?.title}
      <div className="bottomWrapper">
        <div>
          <img src={trash} onClick={() => deleteTask(task.title)} />
        </div>
        <div className={`status ${task?.state}`}>{task.state}</div>
      </div>
    </div>
  );
}

export default Task;
