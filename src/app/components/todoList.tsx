import { Task } from "../page";

const ToDoList = ({
  todoItems,
  completeTodo
}: {
  todoItems: Task[];
  completeTodo: (task) => void;
}) => {
  const listItems = todoItems.map((item, index) => {
    return (
      <li key={index} className="text-lg w-full justify-between flex">
        - {item.name}{' '}
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div>To Do:</div>
          <div>___________________________</div>
        </div>

        <ul >{listItems}</ul>
      </div>
    </>
  );
};

export default ToDoList;
