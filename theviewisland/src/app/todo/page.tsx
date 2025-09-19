"use client";

import { useState } from "react";

type Task = {
  text: string;
  dateTime: string;
  completed: boolean;
};

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-[30rem] flex-col items-center justify-center gap-y-5 bg-white p-10">
      <h1 className="flex w-full justify-center text-center text-2xl font-semibold">
        Todo List
      </h1>
      <TaskInput addTask={addTask} />
      <List task={tasks} toogleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}

const List = ({
  task,
  toogleTask,
  deleteTask,
}: {
  task: Task[];
  toogleTask: (index: number) => void;
  deleteTask: (index: number) => void;
}) => {
  return (
    <ul className="flex w-full flex-col gap-y-3">
      {task.map((value, index) => (
        <li key={index} className="">
          <div className="flex gap-x-2">
            <p>{value.text}</p>
            <p>{new Date(value.dateTime).toLocaleString()}</p>
            <p className="rounded-full bg-black/10 px-2 py-1">
              {value.completed ? "completed" : "not completed"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full bg-green-500/30 px-2 py-1 text-sm"
              onClick={() => toogleTask(index)}
            >
              Completed
            </button>
            <button
              type="button"
              className="rounded-full bg-red-500/30 px-2 py-1 text-sm"
              onClick={() => deleteTask(index)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const TaskInput = ({ addTask }: { addTask: (task: Task) => void }) => {
  const [text, setText] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleAddTask = () => {
    if (text.trim() && dateTime) {
      addTask({ text, dateTime, completed: false });
      setText("");
      setDateTime("");
    }
  };
  return (
    <div className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
        className="flex w-full rounded-full border border-black/10 px-3 py-2"
      />
      <input
        type="datetime-local"
        value={dateTime}
        title="date"
        onChange={(e) => setDateTime(e.target.value)}
        className="mx-auto flex rounded-full border border-black/10 px-3 py-2 text-center"
      />
      <button
        title="add task"
        type="button"
        onClick={handleAddTask}
        className="rounded-full bg-black/10 px-4 py-2"
      >
        Add Task
      </button>
    </div>
  );
};
