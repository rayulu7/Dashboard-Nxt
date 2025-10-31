import { useState } from 'react'
import { Checkbox } from './ui/checkbox'

const CheckTable = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'Horizon UI PRO', progress: '17.5%', quantity: '2.458', date: '24.Jan.2021', checked: false },
    { id: 2, name: 'Horizon UI Free', progress: '10.8%', quantity: '1.485', date: '12.Jun.2021', checked: true },
    { id: 3, name: 'Weekly Update', progress: '21.3%', quantity: '1.024', date: '5.Jan.2021', checked: true },
    { id: 4, name: 'Venus 3D Asset', progress: '31.5%', quantity: '858', date: '7.Mar.2021', checked: true },
    { id: 5, name: 'Marketplace', progress: '12.2%', quantity: '258', date: '17.Dec.2021', checked: false },
  ])

  const toggleCheck = (id) => {
    setTableData(tableData.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-white text-lg sm:text-xl font-bold mb-4">Check Table</h3>
      <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">NAME</th>
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">PROGRESS</th>
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">QUANTITY</th>
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">DATE</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr 
                key={row.id} 
                className={`border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors cursor-pointer ${
                  row.checked ? 'opacity-75' : ''
                }`}
              >
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={row.checked}
                      onCheckedChange={() => toggleCheck(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4"
                    />
                    <span className="text-white text-xs">{row.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-400 text-xs">{row.progress}</td>
                <td className="py-3 text-gray-400 text-xs">{row.quantity}</td>
                <td className="py-3 text-gray-400 text-xs">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CheckTable

