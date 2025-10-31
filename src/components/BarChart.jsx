import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

const weeklyData = [
  { day: 17, value1: 40, value2: 20 },
  { day: 18, value1: 50, value2: 30 },
  { day: 19, value1: 45, value2: 25 },
  { day: 20, value1: 60, value2: 35 },
  { day: 21, value1: 55, value2: 30 },
  { day: 22, value1: 70, value2: 40 },
  { day: 23, value1: 65, value2: 35 },
  { day: 24, value1: 75, value2: 45 },
  { day: 25, value1: 80, value2: 50 },
]

const dailyData = [
  { hour: '00', value: 120 },
  { hour: '04', value: 80 },
  { hour: '08', value: 200 },
  { hour: '12', value: 350 },
  { hour: '14', value: 280 },
  { hour: '16', value: 320 },
  { hour: '18', value: 400 },
]

export const WeeklyRevenueChart = () => {
  const { theme } = useTheme()
  const [colors, setColors] = useState({
    border: '#374151',
    text: '#9CA3AF',
    tooltipBg: '#1B254B',
    tooltipBorder: '#374151',
    tooltipText: '#fff',
    bar1: '#1B254B',
    bar2: '#3BA1FF',
  })

  useEffect(() => {
    if (theme === 'dark') {
      setColors({
        border: '#374151',
        text: '#9CA3AF',
        tooltipBg: '#1B254B',
        tooltipBorder: '#374151',
        tooltipText: '#fff',
        bar1: '#1B254B',
        bar2: '#3BA1FF',
      })
    } else {
      setColors({
        border: '#E2E8F0',
        text: '#718096',
        tooltipBg: '#FFFFFF',
        tooltipBorder: '#E2E8F0',
        tooltipText: '#1A202C',
        bar1: '#CBD5E0',
        bar2: '#3BA1FF',
      })
    }
  }, [theme])

  const getTooltipStyle = () => {
    return {
      backgroundColor: colors.tooltipBg,
      border: `1px solid ${colors.tooltipBorder}`,
      borderRadius: '8px',
      color: colors.tooltipText
    }
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg transition-colors">
      <h3 className="text-primary text-lg sm:text-xl font-bold mb-4">Weekly Revenue</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              dataKey="day" 
              stroke={colors.text} 
              tick={{ fill: colors.text, fontSize: 12 }} 
            />
            <YAxis 
              stroke={colors.text} 
              tick={{ fill: colors.text, fontSize: 12 }} 
              width={50} 
            />
            <Tooltip contentStyle={getTooltipStyle()} />
            <Bar dataKey="value1" stackId="a" fill={colors.bar1} radius={[4, 4, 0, 0]} />
            <Bar dataKey="value2" stackId="a" fill={colors.bar2} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export const DailyTrafficChart = () => {
  const { theme } = useTheme()
  const [colors, setColors] = useState({
    border: '#374151',
    text: '#9CA3AF',
    tooltipBg: '#1B254B',
    tooltipBorder: '#374151',
    tooltipText: '#fff',
  })

  useEffect(() => {
    if (theme === 'dark') {
      setColors({
        border: '#374151',
        text: '#9CA3AF',
        tooltipBg: '#1B254B',
        tooltipBorder: '#374151',
        tooltipText: '#fff',
      })
    } else {
      setColors({
        border: '#E2E8F0',
        text: '#718096',
        tooltipBg: '#FFFFFF',
        tooltipBorder: '#E2E8F0',
        tooltipText: '#1A202C',
      })
    }
  }, [theme])

  const getTooltipStyle = () => {
    return {
      backgroundColor: colors.tooltipBg,
      border: `1px solid ${colors.tooltipBorder}`,
      borderRadius: '8px',
      color: colors.tooltipText
    }
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-primary text-lg sm:text-xl font-bold">Daily Traffic</h3>
          <p className="text-secondary text-sm mt-1">2.579 Visitors</p>
        </div>
        <span className="text-green-400 text-sm font-semibold">+2.45%</span>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              type="number" 
              stroke={colors.text} 
              tick={{ fill: colors.text }} 
            />
            <YAxis 
              dataKey="hour" 
              type="category" 
              stroke={colors.text} 
              tick={{ fill: colors.text }} 
              width={40} 
            />
            <Tooltip contentStyle={getTooltipStyle()} />
            <Bar dataKey="value" fill="#7551FF" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

