import { useState } from 'react'
import './App.css'
import { PlusCircle, Trash2, CheckCircle, Circle } from 'lucide-react';
type Category = 'personal' | 'work' | 'shopping' | 'other';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: Category;
}

function App() {
  const [count, setCount] = useState<number>(-1)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<String>('');
  const [category, setCategory] = useState<Category>('personal');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();// evita que se recarge la pagina al llenar el formulario
    if (newTask.trim()) { // trim() elimina los espacios en blanco al inicio y al final de la cadena
      setTasks([
        ...tasks, // copia las tareas existentes ... es el operador de propagacion esto copiara todos los elementos existentes en la matriz tasks
        {
          id: Date.now(), // genera un id unico revisar esto debido a que lo genera tipo date y nececitamos que sea con mongo
          text: newTask.trim(),
          completed: false,
          category,
        },
        
      ]);
      setCount((count) => count + 1);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => // devuelve la array de tareas copiada
        task.id === id ? { ...task, completed: !task.completed } : task // compara una por una de las tareas aver cual es la que se va a modificar y le cambia el estado al opuesto
      )
      
    ); 
    tasks.map((task) => {
      if (task.completed == true) {
        setCount((count) => count - 1);
      } else if (task.completed == false) {
        setCount((count) => count + 1);
      }
    });
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id)); // busca en todo el array de tasks borra la seleccionada
    setCount((count) => count - 1);
  };

  return (
    <>
      <div className="card">
          Tareas pendientes {count}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Lista de Tareas
        </h1>
        
        <form onSubmit={addTask} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Añadir nueva tarea..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="personal">Personal</option>
              <option value="work">Trabajo</option>
              <option value="shopping">Compras</option>
              <option value="other">Otros</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
               <PlusCircle size={20} />
              Añadir
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border-l-4 ${
                task.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle />
                  )}
                </button>
                <div>
                  <p
                    className={`text-gray-800 ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.text}
                  </p>
                  <span className="text-sm text-gray-500 capitalize">
                    {task.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No hay tareas pendientes. ¡Añade una nueva tarea!
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
