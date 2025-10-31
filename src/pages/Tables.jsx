import { useState } from 'react'
import CheckTable from '../components/CheckTable'
import ComplexTable from '../components/ComplexTable'
import { HiDownload, HiPrinter, HiPlus } from 'react-icons/hi'
import { useToast } from '../components/ui/use-toast'
import { Button } from '../components/ui/button'

const Tables = () => {
  const [selectedTable, setSelectedTable] = useState('check')
  const { toast } = useToast()

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your table data is being exported. You will receive a notification when complete.",
      variant: "default",
    })
  }

  const handlePrint = () => {
    toast({
      title: "Print Dialog",
      description: "Opening print dialog...",
      variant: "default",
    })
    window.print()
  }

  const handleAddNew = () => {
    toast({
      title: "Add New Item",
      description: "Opening form to add a new item...",
      variant: "default",
    })
  }

  return (
    <main className="mt-16 lg:mt-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">Data Tables</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage and view your data tables</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
            <HiDownload />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
            <HiPrinter />
            Print
          </Button>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <HiPlus />
            Add New
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-4 border-b border-gray-700">
        <button
          onClick={() => setSelectedTable('check')}
          className={`pb-4 px-2 transition-colors ${
            selectedTable === 'check'
              ? 'text-purple-accent border-b-2 border-purple-accent'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Check Table
        </button>
        <button
          onClick={() => setSelectedTable('complex')}
          className={`pb-4 px-2 transition-colors ${
            selectedTable === 'complex'
              ? 'text-purple-accent border-b-2 border-purple-accent'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Complex Table
        </button>
      </div>

      <div className="bg-card-bg rounded-xl p-6 shadow-lg">
        {selectedTable === 'check' ? <CheckTable /> : <ComplexTable />}
      </div>
    </main>
  )
}

export default Tables

