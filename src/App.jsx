import "./App.css";
import TodoList from "./Components/TodoList";
import { useState } from "react";
import { TodosContext } from "./contxt/todosContext";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "read..",
    details: "in progress..",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read..",
    details: "in progress..",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read..",
    details: "in progress..",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <div style={{ background: "#11022e" }}>
      <h1 style={{ fontFamily: "a" }}>slm alaykom</h1>
      <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
