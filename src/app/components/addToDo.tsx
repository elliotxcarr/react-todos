import React, { useState } from 'react'

export default function AddToDo({addToDo} :{addToDo: (newTask: string) => void}) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if(!input) return;
    addToDo(input);
    setInput('');
  }
  return (
    <>
    <div className='flex'>
      <input 
        placeholder='Enter a new task...' 
        className='text-black placeholder:text-gray-600 bg-gray-300 p-1'
        value={input}
        onChange={(e)=> setInput(e.target.value)}></input>
      <button 
        className='p-1 bg-gray-600 hover:cursor-pointer hover:bg-gray-700' 
        onClick={handleSubmit}>Add</button>
    </div>
    </>
  )
}
