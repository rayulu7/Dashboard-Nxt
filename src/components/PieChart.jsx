import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Your files', value: 63, color: '#7551FF' },
  { name: 'System', value: 25, color: '#3BA1FF' },
  { name: 'Other', value: 12, color: '#1B254B' },
]

const PieChartComponent = () => {

  const legendData = data.filter(item => item.name !== 'Other')
  
  const getTooltipStyle = () => {
    const theme = document.documentElement.getAttribute('data-theme')
    return {
      backgroundColor: theme === 'dark' ? '#1B254B' : '#FFFFFF',
      border: `1px solid ${theme === 'dark' ? '#374151' : '#E2E8F0'}`,
      borderRadius: '8px',
      color: theme === 'dark' ? '#fff' : '#1A202C'
    }
  }

  const getLegendColor = () => {
    const theme = document.documentElement.getAttribute('data-theme')
    return theme === 'dark' ? '#9CA3AF' : '#718096'
  }
  
  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary text-lg sm:text-xl font-bold">Your Pie Chart</h3>
        <select className="bg-card-bg border border-border text-primary rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-accent transition-colors">
          <option>Monthly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>
      <div className="flex items-center justify-center h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              labelLine={false}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={getTooltipStyle()} />
            <Legend 
              verticalAlign="middle"
              align="right"
              layout="vertical"
              payload={legendData.map(item => ({
                value: item.name,
                type: 'square',
                id: item.name,
                color: item.color
              }))}
              formatter={(value, entry) => {
                const item = legendData.find(d => d.name === value)
                return (
                  <span style={{ color: getLegendColor(), fontSize: '14px' }}>
                    {value} {item ? item.value : ''}%
                  </span>
                )
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChartComponent

