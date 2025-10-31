import { HiFire, HiFingerPrint, HiShoppingBag } from 'react-icons/hi'
import { BsClock, BsCameraVideo } from 'react-icons/bs'
import { useToast } from '../components/ui/use-toast'
import { Button } from './ui/button'

export const LessonCard = () => {
  const { toast } = useToast()
  
  const handleGetStarted = () => {
    toast({
      title: "Lesson Started!",
      description: "You have successfully enrolled in the Business Design lesson.",
      variant: "success",
    })
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <HiFire className="text-white text-xl" />
        </div>
        <div>
          <p className="text-purple-accent text-xs font-semibold mb-1">Business Design</p>
          <p className="text-gray-400 text-xs">New lession is available</p>
        </div>
      </div>
      <h3 className="text-white font-bold mb-4">What do you need to know to create better products?</h3>
      <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <BsClock />
          <span>85 mins</span>
        </div>
        <div className="flex items-center gap-1">
          <BsCameraVideo />
          <span>Video format</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-purple-accent border-2 border-card-bg -ml-2 first:ml-0 hover:scale-110 transition-transform cursor-pointer"></div>
        ))}
      </div>
      <Button 
        onClick={handleGetStarted}
        className="w-full"
        size="default"
      >
        Get Started
      </Button>
    </div>
  )
}

export const SecurityCard = () => {
  const { toast } = useToast()
  
  const handleCards = () => {
    toast({
      title: "Card Security",
      description: "Opening card security settings...",
      variant: "default",
    })
  }

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-purple-accent/20 flex items-center justify-center hover:bg-purple-accent/30 transition-colors cursor-pointer">
          <HiFingerPrint className="text-purple-accent text-3xl" />
        </div>
      </div>
      <h3 className="text-white font-bold text-center mb-2">Control card security in-app with a tap</h3>
      <p className="text-gray-400 text-sm text-center mb-4">Discover our cards benefits, with one tap.</p>
      <Button 
        onClick={handleCards}
        className="w-full"
        size="default"
      >
        Cards
      </Button>
    </div>
  )
}

export const StarbucksCard = () => {
  const { toast } = useToast()
  
  const handleRedeem = () => {
    toast({
      title: "Offer Redeemed!",
      description: "Your 10% cashback offer has been applied. Enjoy your coffee!",
      variant: "success",
    })
  }

  return (
    <div 
      className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg overflow-hidden relative cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={handleRedeem}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full -mr-16 -mt-16"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-xl">Starbucks</h3>
          <HiShoppingBag className="text-white text-xl hover:scale-110 transition-transform" />
        </div>
        <p className="text-gray-400 text-sm mb-4">10% cashback & off</p>
        <div className="w-full h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-green-700 transition-all">
          <span className="text-6xl hover:scale-110 transition-transform">☕</span>
        </div>
      </div>
    </div>
  )
}

