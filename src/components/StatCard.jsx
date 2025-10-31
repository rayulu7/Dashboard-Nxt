import { useState } from 'react'

const StatCard = ({ icon: Icon, title, value, subtitle, flag }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div 
      className={`bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg transition-all duration-300 cursor-pointer ${
        hovered ? 'transform scale-105 shadow-xl border border-purple-accent/30' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && <Icon className={`text-purple-accent text-2xl transition-transform ${hovered ? 'scale-110' : ''}`} />}
        {flag && (
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <span className="text-2xl">🇺🇸</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
      {subtitle && (
        <p className={`text-sm mt-2 ${subtitle.includes('+') ? 'text-green-400' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default StatCard

