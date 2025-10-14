const CompletedToDos = ({
  completed,
  undoCompleted,
}: {
  completed: string[];
  undoCompleted: (task: string) => void;
}) => {
  const completedTasks = completed.map((task) => (
    <li className="text-xl">
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
      <div>Completed Tasks:</div>
      <div>__________________________________</div>
      <ul className="p-1">{completedTasks}</ul>
    </>
  );
};

export default CompletedToDos;
