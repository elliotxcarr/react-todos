'use client'
import ToDoList from "./todoList";
import AddToDo from "./addToDo";
import { useState } from "react";
import CompletedToDos from "./completedList";

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
  
  const getData =  async () => {
    try{
      await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
          .then(res => res.json()).then(data => {
            const meals = data.meals;
            const ingredients:string[] = meals.map(meal => meal.strIngredient);
            setTodos(ingredients)
          });
    }
    catch (error){
      console.error(error)
    }
  }

  return (
    <div className="flex flex-row">
      <div className="font-sans flex flex-col h-screen gap-3 p-10 w-1/2">
        <AddToDo addToDo={addTodo}/>
        <ToDoList todoItems={todos} completeTodo={completeTodo} />
      </div>
      <div className="flex flex-col w-1/2 p-10">
        <CompletedToDos completed={completed} undoCompleted={undoCompleted}/>
      </div>
    </div>
    
  );
}