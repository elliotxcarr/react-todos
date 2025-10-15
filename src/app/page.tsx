'use client'
import ToDoList from "./components/todoList";
import AddToDo from "./components/addToDo";
import { useState } from "react";
import CompletedToDos from "./components/completedList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);

  const addTodo = (newTask: string) => setTodos([...todos, newTask]);
  const completeTodo = (task:string) => {
    setCompleted([...completed, task]); 
    setTodos(todos.filter(t => t != task))
  };

  const undoCompleted = (task:string) => {
    setCompleted(completed.filter(t => t != task));
    setTodos([...todos, task])
  }

  const emptyCompleted = () => setCompleted([]);

  const getData =  async () => {
    try{
      await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
          .then(res => res.json()).then(data => {
            const meals = data.meals;
            const ingredients:string[] = meals.map(meal => meal.strIngredient);
            setTodos(ingredients);
          });
    }
    catch (error){
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col mx-25">
      <div className="flex w-full justify-center my-10">
        <AddToDo addToDo={addTodo}/>
      </div>
      <div className="flex p-5 justify-center max-w-screen gap-15 ">
        <div className="flex flex-col outline-1 p-4">
          <ToDoList todoItems={todos} completeTodo={completeTodo} />
        </div>
        <div className="flex flex-col outline-1 p-4">
          <CompletedToDos completed={completed} undoCompleted={undoCompleted} emptyCompleted={emptyCompleted}/>
        </div>
      </div>
    </div>
  );
}