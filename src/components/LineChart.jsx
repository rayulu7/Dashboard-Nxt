import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'SEP', value: 65 },
  { month: 'OCT', value: 75 },
  { month: 'NOV', value: 108 },
  { month: 'DEC', value: 85 },
  { month: 'JAN', value: 95 },
  { month: 'FEB', value: 100 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-bg border border-border p-3 rounded-lg shadow-lg">
        <p className="text-primary font-semibold">${payload[0].value}.00</p>
      </div>
    )
  }
  return null
}

const LineChartComponent = () => {
  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-secondary text-sm mb-1">This month</p>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-primary text-2xl font-bold">$37.5K</h3>
              <p className="text-secondary text-sm">Total Spent</p>
            </div>
            <span className="text-green-400 text-sm flex items-center gap-1">
              <span>+2.45%</span>
              <span className="text-green-400">✓</span>
              <span className="text-secondary">On track</span>
            </span>
          </div>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#7551FF" 
              strokeWidth={3}
              dot={{ fill: '#7551FF', r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3BA1FF" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LineChartComponent

