import { useState } from "react";

export default function KanBan() {
  const [todo, settodo] = useState({
    user: { title: "", description: "", status: "todo" },
    tasks: [],
  });

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const addTodo = () => {
    if (!todo.user.title || !todo.user.description) return;
    console.log("Button Clicked.");

    const Task = {
      id: Date.now(),
      title: todo.user.title,
      description: todo.user.description,
      status: todo.user.status,
    };
    const newTask = [...todo.tasks, Task];
    settodo((prev) => ({
      ...prev,
      tasks: newTask,
      user: { title: "", description: "", status: "todo" },
    }));
  };

  const TodoStatus = {
    tasks: todo.tasks.filter((task) => task.status === "todo"),
  };
  const InProgressStatus = {
    tasks: todo.tasks.filter((task) => task.status === "progress"),
  };
  const DeployedStatus = {
    tasks: todo.tasks.filter((task) => task.status === "deployed"),
  };
  const ArchivedStatus = {
    tasks: todo.tasks.filter((task) => task.status === "archived"),
  };

  const updateStatus = (id, newStatus) => {
    settodo((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      ),
    }));
  };

  function allInOne(heading, checkStatus) {
    const updateButton = (status) => {
      if (status === "todo") return ["progress"];
      if (status === "progress") return ["todo", "deployed"];
      if (status === "deployed") return ["progress", "archived"];
      if (status === "archived") return ["deployed"];
    };

    return (
      <div className="bg-yellow-100 shadow p-2 rounded-2xl ">
        <h2 className="text-2xl text-blue-500 hover:text-blue-600 text-center mb-3">
          {heading}
        </h2>

        <div className="flex flex-col gap-3">
          {checkStatus.tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl text-center p-3 mb-3"
            >
              <h3>{task.title}</h3>
              <h4>{task.description}</h4>
              <div className="flex justify-evenly gap-2">
                <div>
                  {updateButton(task.status).map((prev) => (
                    <button
                      onClick={() => {
                        updateStatus(task.id, prev);
                      }}
                      className="border rounded-2xl p-1 text-amber-900 bg-amber-200 hover:bg-amber-300 "
                    >
                      Go {prev}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <h2 className="text-xl text-center font-semibold mb-3">Deploy task</h2>
      <div className="bg-white  rounded-2xl flex flex-col md:flex-row gap-3 justify-center p-3 mb-3">
        <input
          type="text"
          placeholder="Enter Title"
          className="border rounded-2xl p-2 "
          value={todo.user.title}
          onChange={(e) =>
            settodo((prev) => ({
              ...prev,
              user: { ...prev.user, title: e.target.value },
            }))
          }
        />
        <input
          type="text"
          placeholder="Enter Description"
          className="border rounded-2xl p-2 "
          value={todo.user.description}
          onChange={(e) =>
            settodo((prev) => ({
              ...prev,
              user: { ...prev.user, description: e.target.value },
            }))
          }
        />
        <button
          onClick={addTodo}
          className="bg-amber-200 hover:bg-amber-300 border rounded-2xl p-2 text-center"
        >
          Add Todo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {allInOne("Todo", TodoStatus)}
        {allInOne("In_Progress", InProgressStatus, "deployed")}
        {allInOne("Deployed", DeployedStatus)}
        {allInOne("Archived", ArchivedStatus)}
      </div>
    </div>
  );
}
