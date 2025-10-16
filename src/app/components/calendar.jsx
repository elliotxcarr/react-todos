const Calendar = ({days}) => {
  const week = days.map(day => {
    return (
      <div className="flex w-27 h-27 outline-1 p-1">
        <div className="absolute text-sm ">{day.day}</div>
          <div className=" w-full h-full flex justify-center items-center">
              {day.tasks === 0 ? '' : 
                <div className="w-8 h-8 bg-green-700 rounded-full">
                  <div className="text-xl text-center p-1">{day.tasks}</div>
                </div>
              }
          </div>
      </div>
    )
  })
  return (
    <>
      <div className="grid grid-cols-7">
        {week}
      </div>
    </>
  )
}

export default Calendar