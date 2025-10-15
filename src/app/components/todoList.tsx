const ToDoList = ({
  todoItems,
  completeTodo
}: {
  todoItems: string[];
  completeTodo: (task) => void;
}) => {
  const listItems = todoItems.map((item, index) => {
    return (
      <li key={index} className="text-xl p-1 w-full justify-between flex">
        - {item}{' '}
        <button
          className="hover:cursor-pointer"
          onClick={() => completeTodo(item)}
        >
          ✅
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div>To Do:</div>
          <div>__________________________________</div>
        </div>
        
        <ul >{listItems}</ul>
      </div>
    </>
  );
};

export default ToDoList;
