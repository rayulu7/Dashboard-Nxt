import { useState } from 'react'

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState('April')
  const [selectedYear, setSelectedYear] = useState('2021')
  const [selectedDays, setSelectedDays] = useState([27, 28, 29, 30])
  
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fri', 'Sa', 'Su']
  const days = []
  
  
  for (let i = 1; i <= 30; i++) {
    days.push(i)
  }

  const handleDayClick = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-lg sm:text-xl font-bold">Calendar</h3>
        <div className="flex items-center gap-2">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-card-bg border border-gray-600 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-accent cursor-pointer"
          >
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-card-bg border border-gray-600 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-purple-accent cursor-pointer"
          >
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-gray-400 text-[10px] font-semibold py-0.5">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            className={`text-center py-1.5 rounded-md cursor-pointer transition-all hover:scale-105 text-xs ${
              selectedDays.includes(day)
                ? 'bg-purple-accent text-white shadow-md font-semibold'
                : 'text-gray-300 hover:bg-gray-700/30'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar

