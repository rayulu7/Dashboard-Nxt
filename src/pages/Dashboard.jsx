import { useState } from 'react'
import StatCard from '../components/StatCard'
import LineChartComponent from '../components/LineChart'
import { WeeklyRevenueChart, DailyTrafficChart } from '../components/BarChart'
import PieChartComponent from '../components/PieChart'
import CheckTable from '../components/CheckTable'
import ComplexTable from '../components/ComplexTable'
import Tasks from '../components/Tasks'
import Calendar from '../components/Calendar'
import TeamMembers from '../components/TeamMembers'
import { LessonCard, SecurityCard, StarbucksCard } from '../components/InfoCards'
import { 
  HiChartBar, 
  HiCurrencyDollar, 
  HiFlag, 
  HiCheckCircle,
  HiFolder
} from 'react-icons/hi'

const Dashboard = () => {
  return (
    <main className="mt-16 lg:mt-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm sm:text-base">Welcome to your dashboard. View your analytics and manage your data.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard 
          icon={HiChartBar}
          title="Earnings"
          value="$350.4"
        />
        <StatCard 
          icon={HiCurrencyDollar}
          title="Spend this Month"
          value="$682.5"
        />
        <StatCard 
          icon={HiChartBar}
          title="Sales"
          value="$574.34"
          subtitle="+23% since last month"
        />
        <StatCard 
          title="Your balance"
          value="$1,000"
          flag={true}
        />
        <StatCard 
          icon={HiCheckCircle}
          title="New Tasks"
          value="154"
        />
        <StatCard 
          icon={HiFolder}
          title="Total Projects"
          value="2935"
        />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartComponent />
        <WeeklyRevenueChart />
      </div>

      {/* Check Table Row */}
      <div className="mb-6">
        <CheckTable />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DailyTrafficChart />
        <PieChartComponent />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ComplexTable />
        <Tasks />
        <Calendar />
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <LessonCard />
        <TeamMembers />
        <SecurityCard />
        <StarbucksCard />
      </div>

      
      <footer className="mt-12 pb-8 text-center">
        <p className="text-gray-400 text-xs sm:text-sm mb-2 px-4">
          © {new Date().getFullYear()} Dashboard. All Rights Reserved. Created with ❤️ by Rayulu
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm px-4">
          <a href="#" className="hover:text-white transition-colors">Marketplace</a>
          <a href="#" className="hover:text-white transition-colors">License</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
        </div>
      </footer>
    </main>
  )
}

export default Dashboard

