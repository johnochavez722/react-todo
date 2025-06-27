import { useState } from 'react'
import './App.css'

interface Todo{
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if(input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };

    setTodos([newTodo, ...todos]);
    setInput("");

  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
        <div className="backdrop-blur-md bg-white/70 border border-white/30 p-6 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
            ✏️ To-Do List
          </h1>

          <div className="flex mb-6">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput( e.target.value )}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add new task..."
              className="flex-1 border rounded px-3 py-2 mr-2"
            />
            <button 
              onClick={addTodo}
              className="bg-blue-500 text-white px-5 py-2 rounded-r-full hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between bg-white bg-opacity-80 border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:shadow transition cursor-pointer group">
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"} transition`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                    >
                      Delete
                    </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default App
