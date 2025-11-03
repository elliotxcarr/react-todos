import { Task } from "../page";

const CompletedToDos = ({
  completed,
  toggleComplete,
  emptyComplete,
}: {
  completed: Task[];
  toggleComplete: (task: Task) => void;
  emptyComplete: () => void;
}) => {
  const completedTasks = completed.map((task) => (
    <li className="text-xl p-1 w-full justify-between flex">
      - {task.name}{' '}
      <button
        className="hover:cursor-pointer"
        onClick={() => toggleComplete(task)}
      >
        ↶
      </button>
    </li>
  ));

  const clearBtnClicked = () => {
    if(completed.length === 0) return;
    if(confirm('Are you sure you want to clear completed tasks?')){
      emptyComplete()
    }
    else return;
  }
  return (
    <>
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">Completed Tasks:
          <button className="hover:cursor-pointer" onClick={() => clearBtnClicked()}>❌</button>
        </div>
        <div>___________________________</div>
      </div>
      <ul >{completedTasks}</ul>
    </div>
      
    </>
  );
};

export default CompletedToDos;
