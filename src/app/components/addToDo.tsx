import React, { useState } from 'react'
import { Task } from '../page';
export default function AddToDo({addToDo, days} :{addToDo: (newTask: Task) => void, days:any}) {

  const [task, setTask] = useState({name: '', day: ''});

  const handleSubmit = () => {
    if(!task) return;
    addToDo(task);
    setTask({name: '', day: ''});
  }

  return (
    <>
    <div className='flex flex-col gap-1'>
      <label className='flex flex-col'>
        Enter a task
        <input 
          className='text-black placeholder:text-gray-600 bg-gray-300 p-1'
          value={task.name}
          onChange={(e)=> setTask(t => ({...t, name: e.target.value}))}></input>
      </label>
      <label className='flex flex-col'>
        Select a day
        <select 
        className='text-black placeholder:text-gray-600 bg-gray-300 p-1'
        value={task.day}
        onChange={(e)=> setTask(t => ({...t, day: e.target.value}))}>
          <option value={''}></option>
          {days.map(d => <option value={d.day}>{d.day}</option>)}
        </select>
      </label>
      <button 
        className='p-1 bg-gray-600 hover:cursor-pointer hover:bg-gray-700 mt-1' 
        onClick={handleSubmit}>Add</button>
    </div>
    </>
  )
}
