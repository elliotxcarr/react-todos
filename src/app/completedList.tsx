const CompletedToDos = ({
  completed,
  undoCompleted,
  emptyCompleted
}: {
  completed: string[];
  undoCompleted: (task: string) => void;
  emptyCompleted: () => void;
}) => {
  const completedTasks = completed.map((task) => (
    <li className="text-xl p-1 w-full justify-between flex">
      - {task}{' '}
      <button
        className="hover:cursor-pointer"
        onClick={() => undoCompleted(task)}
      >
        ↶
      </button>
    </li>
  ));
  return (
    <>
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">Completed Tasks:
          <button className="hover:cursor-pointer" onClick={() => emptyCompleted()}>🗑️</button>
        </div>
        <div>__________________________________</div>
      </div>
      <ul >{completedTasks}</ul>
    </div>
      
    </>
  );
};

export default CompletedToDos;
