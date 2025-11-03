'use client'
import ToDoList from "./components/todoList";
import AddToDo from "./components/addToDo";
import CompletedToDos from "./components/completedList";
import Calendar from "./components/calendar";
import { useTasks } from "./controllers/todo.controller";

export interface Task {
  _id?: string;
  name: string;
  day: string;
  completed: boolean;
}
export interface Day{
  day: string;
  tasks: number;
  completedTasks: number;
}

export default function Home() {
  const {tasks, days, addTask, toggleComplete, emptyComplete} = useTasks();

  const active = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <div className="flex flex-col mx-15">
      <div className="flex p-5 items-center max-w-screen gap-5 my-5">
        <AddToDo addToDo={addTask} days={days} />
        <Calendar days={days} />
      </div>

      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col outline-1 p-4">
          <ToDoList todoItems={active} completeTodo={toggleComplete} />
        </div>

        <div className="flex flex-col outline-1 p-4">
          <CompletedToDos
            completed={completed}
            toggleComplete={toggleComplete}
            emptyComplete={emptyComplete}
          />
        </div>
      </div>
    </div>
  );
}