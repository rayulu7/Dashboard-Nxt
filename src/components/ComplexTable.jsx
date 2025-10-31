import { HiCheckCircle, HiXCircle, HiExclamationCircle } from 'react-icons/hi'

const ComplexTable = () => {
  const tableData = [
    { name: 'Horizon UI PRO', status: 'Approved', statusColor: 'green', date: '18 Apr 2022', progress: 80 },
    { name: 'Horizon UI Free', status: 'Disable', statusColor: 'red', date: '18 Apr 2022', progress: 60 },
    { name: 'Marketplace', status: 'Error', statusColor: 'yellow', date: '20 May 2021', progress: 40 },
    { name: 'Weekly Updates', status: 'Approved', statusColor: 'green', date: '12 Jul 2021', progress: 90 },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <HiCheckCircle className="text-green-400 text-base" />
      case 'Disable':
        return <HiXCircle className="text-red-400 text-base" />
      case 'Error':
        return <HiExclamationCircle className="text-yellow-400 text-base" />
      default:
        return null
    }
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-white text-lg sm:text-xl font-bold mb-4">Complex Table</h3>
      <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">NAME</th>
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">STATUS</th>
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">DATE</th>
              <th className="text-left text-gray-400 text-xs font-semibold pb-3">PROGRESS</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/10 transition-colors">
                <td className="py-3 text-white text-xs font-medium">{row.name}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(row.status)}
                    <span className={`text-xs ${
                      row.statusColor === 'green' ? 'text-green-400' :
                      row.statusColor === 'red' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {row.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-gray-400 text-xs">{row.date}</td>
                <td className="py-3">
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-purple-accent h-1.5 rounded-full transition-all"
                      style={{ width: `${row.progress}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ComplexTable

