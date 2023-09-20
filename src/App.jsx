import { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const onAddTask = (e) => {
    e.preventDefault();
    if (editingTaskId !== null) {
      return;
    }

    const date = new Date();
    setTasks([
      ...tasks,
      {
        id: date.getMilliseconds(),
        value: state,
        isImportant: false,
      },
    ]);
    console.log(tasks);
    setState("");
  };

  const onDeleteTask = (id) => {
    if (id === editingTaskId) {
      return;
    }

    const filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  };

  const onImportant = (id) => {
    if (editingTaskId === id) {
      setEditingTaskId(null);
    }

    const updatedTasks = tasks.map((el) => {
      if (el.id === id) {
        return { ...el, isImportant: !el.isImportant };
      }
      return el;
    });
    setTasks(updatedTasks);
    setSelectedTaskId(id);
    console.log("UPDATED", updatedTasks);
  };

  const onEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTaskId(id);
      setEditingText(taskToEdit.value);
    }
  };

  const onSaveTask = () => {
    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTaskId) {
          return { ...task, value: editingText };
        }
        return task;
      });

      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditingText("");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={onAddTask}>
          <input
            value={state}
            onChange={(event) => setState(event.target.value)}
            type="text"
            placeholder="Введите текст задачи..."
          />
          <button onClick={onAddTask}>Добавить</button>
        </form>
      </div>

      <div>
        <ul>
          {tasks.map((item, i) => (
            <li
              style={{ listStyle: "none", padding: "0", margin: "0" }}
              key={item.id}
            >
              {editingTaskId === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button onClick={onSaveTask}>Сохранить</button>
                </div>
              ) : (
                <div>
                  <h3
                    style={{
                      color:
                        item.isImportant && selectedTaskId === item.id
                          ? "green"
                          : "black",
                      cursor: "pointer",
                    }}
                    onClick={() => onImportant(item.id)}
                  >
                    {i + 1}. {item.value}
                  </h3>
                  <button onClick={() => onDeleteTask(item.id)}>Удалить</button>
                  <button onClick={() => onEditTask(item.id)}>Редактировать</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
