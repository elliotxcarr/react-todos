const ToDoList = ({
  todoItems,
  completeTodo
}: {
  todoItems: string[];
  completeTodo: (task) => void;
}) => {
  const listItems = todoItems.map((item) => {
    return (
      <li className="text-xl w-full justify-between flex">
        - {item}
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
      <div className="flex w-1/2">
        <ul className="w-full">{listItems}</ul>
      </div>
    </>
  );
};

export default ToDoList;
