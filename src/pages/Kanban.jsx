import { useState } from 'react'
import { HiPlus, HiDotsVertical } from 'react-icons/hi'

const Kanban = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: 'Design new landing page', assignee: 'John', priority: 'high' },
      { id: 2, title: 'Update user documentation', assignee: 'Sarah', priority: 'medium' },
    ],
    inProgress: [
      { id: 3, title: 'Implement authentication', assignee: 'Mike', priority: 'high' },
      { id: 4, title: 'Fix mobile responsive issues', assignee: 'Emma', priority: 'medium' },
    ],
    review: [
      { id: 5, title: 'Code review for payment module', assignee: 'David', priority: 'high' },
    ],
    done: [
      { id: 6, title: 'Deploy to production', assignee: 'Lisa', priority: 'low' },
      { id: 7, title: 'Write unit tests', assignee: 'Tom', priority: 'medium' },
    ],
  })

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-yellow-500' },
    { id: 'review', title: 'Review', color: 'bg-purple-accent' },
    { id: 'done', title: 'Done', color: 'bg-green-500' },
  ]

  const handleDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId)
    e.dataTransfer.setData('sourceColumn', sourceColumn)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetColumn) => {
    e.preventDefault()
    const taskId = parseInt(e.dataTransfer.getData('taskId'))
    const sourceColumn = e.dataTransfer.getData('sourceColumn')

    if (sourceColumn === targetColumn) return

    const task = tasks[sourceColumn].find(t => t.id === taskId)
    if (!task) return

    setTasks(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(t => t.id !== taskId),
      [targetColumn]: [...prev[targetColumn], task],
    }))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <main className="mt-16 lg:mt-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">Kanban Board</h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage your tasks with drag and drop</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-card-bg rounded-xl p-4 shadow-lg"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                <h2 className="text-white font-bold">{column.title}</h2>
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {tasks[column.id].length}
                </span>
              </div>
              <button className="text-gray-400 hover:text-white">
                <HiPlus />
              </button>
            </div>

            <div className="space-y-3 min-h-[200px]">
              {tasks[column.id].map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                  className="bg-dark-blue p-4 rounded-lg cursor-move hover:shadow-lg transition-all border border-gray-700 hover:border-purple-accent"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-sm">{task.title}</h3>
                    <button className="text-gray-400 hover:text-white">
                      <HiDotsVertical />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <span className="text-gray-400 text-xs">{task.assignee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Kanban

