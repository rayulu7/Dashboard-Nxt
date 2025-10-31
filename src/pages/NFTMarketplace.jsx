import { useState } from 'react'
import { HiHeart, HiShoppingCart } from 'react-icons/hi'
import { useToast } from '../components/ui/use-toast'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'

const NFTMarketplace = () => {
  const [liked, setLiked] = useState({})
  const [selectedNFT, setSelectedNFT] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const nfts = [
    { id: 1, name: 'Abstract Art #1', price: '0.5 ETH', image: '🎨', creator: 'Artist1', likes: 120 },
    { id: 2, name: 'Digital Dream', price: '1.2 ETH', image: '✨', creator: 'Artist2', likes: 89 },
    { id: 3, name: 'Cosmic Vision', price: '0.8 ETH', image: '🌌', creator: 'Artist3', likes: 156 },
    { id: 4, name: 'Neon Nights', price: '2.1 ETH', image: '💎', creator: 'Artist4', likes: 203 },
    { id: 5, name: 'Pixel Perfect', price: '0.3 ETH', image: '🎮', creator: 'Artist5', likes: 67 },
    { id: 6, name: 'Cyber Punk', price: '1.5 ETH', image: '🤖', creator: 'Artist6', likes: 234 },
  ]

  const toggleLike = (id) => {
    setLiked(prev => {
      const isLiked = prev[id]
      if (!isLiked) {
        toast({
          title: "NFT Liked!",
          description: "This NFT has been added to your favorites.",
          variant: "success",
        })
      }
      return { ...prev, [id]: !prev[id] }
    })
  }

  const handleBuyNow = (nft) => {
    setSelectedNFT(nft)
    setDialogOpen(true)
  }

  const confirmPurchase = () => {
    toast({
      title: "Purchase Successful!",
      description: `You have successfully purchased ${selectedNFT.name} for ${selectedNFT.price}`,
      variant: "success",
    })
    setDialogOpen(false)
    setSelectedNFT(null)
  }

  return (
    <main className="mt-16 lg:mt-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">NFT Marketplace</h1>
        <p className="text-gray-400 text-sm sm:text-base">Discover and collect unique digital assets</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className="bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="w-full h-64 bg-gradient-to-br from-purple-accent/20 to-light-blue/20 rounded-lg flex items-center justify-center mb-4 text-8xl">
              {nft.image}
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-bold text-lg">{nft.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLike(nft.id)
                }}
                className={`p-2 rounded-lg transition-colors ${
                  liked[nft.id] ? 'text-red-500 bg-red-500/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                }`}
              >
                <HiHeart className={`text-xl ${liked[nft.id] ? 'fill-current' : ''}`} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">by {nft.creator}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Current Price</p>
                <p className="text-white font-bold text-xl">{nft.price}</p>
              </div>
              <Button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleBuyNow(nft)
                }}
                className="flex items-center gap-2"
              >
                <HiShoppingCart />
                Buy Now
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 flex items-center gap-2 text-gray-400 text-sm">
              <HiHeart className="text-red-500" />
              <span>{nft.likes + (liked[nft.id] ? 1 : 0)} likes</span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Are you sure you want to purchase {selectedNFT?.name} for {selectedNFT?.price}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPurchase}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default NFTMarketplace

