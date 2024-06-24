import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TaskState = "ONGOING" | "DONE" | "STATUS";

type Task = {
  title: string;
  state: TaskState;
};

interface State {
  tasks: Task[];
  draggedTask: Task["title"] | null;
  addTask: (task: Task) => void;
  deleteTask: (title: string) => void;
  setDraggedTask: (task: Task["title"] | null) => void;
  moveTask: (title: string, state: TaskState) => void;
}

const store: StateCreator<State, [["zustand/devtools", never]], []> = (
  set
) => ({
  tasks: [],
  draggedTask: null,
  addTask: (task) =>
    set((store) => ({ tasks: [...store.tasks, task] }), false, "addTask"),
  deleteTask: (title) =>
    set(
      (store) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      }),
      false,
      "deleteTask"
    ),
  setDraggedTask: (title) =>
    set({ draggedTask: title }, false, "setDraggedTask"),
  moveTask: (title, state) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      }),
      false,
      "moveTask"
    ),
});

export const useStore = create<State>()(
  persist(devtools(store), { name: "tasks" })
);
