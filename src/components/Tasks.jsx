import { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import { Checkbox } from './ui/checkbox'

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Landing Page Design', completed: false },
    { id: 2, text: 'Dashboard Builder', completed: true },
    { id: 3, text: 'Mobile App Design', completed: true },
    { id: 4, text: 'Illustrations', completed: false },
    { id: 5, text: 'Promotional LP', completed: true },
  ])

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-white text-lg sm:text-xl font-bold mb-4">Tasks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer border border-gray-700/50"
            onClick={() => toggleTask(task.id)}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 flex-shrink-0"
            />
            <span className={`flex-1 text-xs ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
              {task.text}
            </span>
            <HiDotsVertical 
              className="text-gray-400 cursor-pointer hover:text-white flex-shrink-0 text-sm" 
              onClick={(e) => {
                e.stopPropagation()
                
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks

