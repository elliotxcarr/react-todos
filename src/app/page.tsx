'use client'
import ToDoList from "./components/todoList";
import AddToDo from "./components/addToDo";
import { useState } from "react";
import CompletedToDos from "./components/completedList";
import Calendar from "./components/calendar";

export interface Task {
  name: string;
  day: string;
}
export interface Day{
  day: string;
  tasks: number;
  //add complete tasks and incomplete tasks and show coloured
}

const dayInitial: Day[] = [
      {day:'Monday', tasks:0},
      {day:'Tuesday', tasks:0},
      {day:'Wednesday', tasks:0},
      {day:'Thursday', tasks:0},
      {day:'Friday', tasks:0},
      {day:'Saturday', tasks:0},
      {day:'Sunday', tasks:0},
    ]

export default function Home() {
  const [todos, setTodos] = useState([] as Task[]);
  const [completed, setCompleted] = useState([]);
  const [days, setDays] = useState(dayInitial);

  const updateCalendar = (task, change) => {
    setDays(days => 
        days.map(d => d.day === task.day ? {...d, tasks: d.tasks + change} : d)
    )
  }
  const removeFromArray = (array, item) => array.filter(a => a != item);

  const addTodo = (newTask: Task) => {
    updateCalendar(newTask, +1);
    setTodos([...todos, newTask]);
  };

  const completeTodo = (task:Task) => {
    setCompleted([...completed, task]); 
    setTodos(todos => removeFromArray(todos, task));
    updateCalendar(task, -1);
  };

  const undoCompleted = (task:Task) => {
    setCompleted(comp => removeFromArray(comp, task));
    setTodos([...todos, task]);
    updateCalendar(task, +1);
  }

  const emptyCompleted = () => {
    setCompleted([]);
  };

  return (
    <div className="flex flex-col mx-15">
      <div className="flex p-5 items-center max-w-screen gap-5 my-5">
        <div className="flex">
          <AddToDo addToDo={addTodo} days={days}/>
        </div>
        <Calendar days={days}/>
      </div>
      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col outline-1 p-4">
            <ToDoList 
              todoItems={todos} 
              completeTodo={completeTodo}/>
        </div>
        <div className="flex flex-col outline-1 p-4">
          <CompletedToDos 
            completed={completed} 
            undoCompleted={undoCompleted} 
            emptyCompleted={emptyCompleted}/>
        </div>
      </div>
    </div>
  );
}