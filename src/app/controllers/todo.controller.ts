import { useCallback, useEffect, useState } from "react";
import { Day, Task } from "../page";

const daysInitial: Day[] = [
      {day:'Monday', tasks:0, completedTasks: 0},
      {day:'Tuesday', tasks:0, completedTasks: 0},
      {day:'Wednesday', tasks:0, completedTasks: 0},
      {day:'Thursday', tasks:0, completedTasks: 0},
      {day:'Friday', tasks:0, completedTasks: 0},
      {day:'Saturday', tasks:0, completedTasks: 0},
      {day:'Sunday', tasks:0, completedTasks: 0},
    ]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [days, setDays] = useState(daysInitial);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/to_dos");
        const data = await res.json();
        setTasks(data);
        updateCalendarData(data);
      } catch (err) {
        console.error(err);
      }
    })()
  }, []);

  const updateCalendarData = useCallback((tasks: Task[]) => {
    setDays(daysInitial.map(d => {
      const dayTasks = tasks.filter(t => t.day === d.day && !t.completed);
      return { ...d, tasks: dayTasks.length };
    }));
  }, []);

  const addTask = useCallback(async (newTask: Omit<Task, "_id">) => {
    const optimistic = {...newTask, _id: Date.now().toString()};
    setTasks(prev => [...prev, optimistic]);
    updateCalendarData([...tasks, optimistic]);

    try{
      const response = await fetch("http://localhost:3000/api/to_dos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      });
      const saved = await response.json();
      setTasks(prev => prev.map(t => t._id === optimistic._id ? saved : t));
      updateCalendarData([...tasks.filter(t => t._id !== optimistic._id), saved]);
    }catch(error){
      console.error(error);
      setTasks(prev => prev.filter(t => t._id !== optimistic._id))
    }
  }, [tasks]);

  const toggleComplete = useCallback(async(task: Task) => {
    const updated = tasks.map(t =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      );
      setTasks(updated);
      updateCalendarData(updated);
    try{
      await fetch('http://localhost:3000/api/to_dos', {
        method: 'PUT',
        body: JSON.stringify({id: task._id})
      });
      
    } catch(err){
      console.error(err)
    }
    
  }, [tasks]);

  const emptyComplete = useCallback(async () => {
    try{
      await fetch('http://localhost:3000/api/to_dos/deleteCompleted', {
        method:"DELETE"
      });
      const updated = tasks.filter(t => !t.completed);
      setTasks(updated);
      updateCalendarData(updated);
    } catch(err){
      console.error('Failed to delete completed todos:', err)
    }
  }, [tasks])

  return {tasks, days, addTask, toggleComplete, emptyComplete}
}
