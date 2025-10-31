import { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

const MemberAvatar = ({ member }) => {
  const [imageError, setImageError] = useState(false)
  
  const isImageUrl = (avatar) => {
    if (!avatar) return false
    
    if (avatar.startsWith('http') || avatar.startsWith('https') || avatar.startsWith('data:image')) {
      return true
    }
    if (avatar.startsWith('/') || avatar.startsWith('./')) {
      return true
    }
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    return imageExtensions.some(ext => avatar.toLowerCase().endsWith(ext))
  }

  
  const normalizeImagePath = (avatar) => {
    if (!avatar) return avatar
    
    if (avatar.startsWith('http') || avatar.startsWith('https') || avatar.startsWith('data:image') || avatar.startsWith('/') || avatar.startsWith('./')) {
      return avatar
    }
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
    if (imageExtensions.some(ext => avatar.toLowerCase().endsWith(ext))) {
      return '/' + avatar
    }
    return avatar
  }

  const isImage = isImageUrl(member.avatar)
  const imagePath = normalizeImagePath(member.avatar)

  if (isImage && !imageError) {
    return (
      <img 
        src={imagePath} 
        alt={member.name}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
    )
  }

  
  return (
    <div className="w-full h-full flex items-center justify-center">
      {member.avatar && !isImage ? member.avatar : member.name.substring(0, 2).toUpperCase()}
    </div>
  )
}

const TeamMembers = () => {
  
  const members = [
    { name: 'Rayulu', role: 'App Developer', avatar: '/Rayulu.jpg' }, 
    { name: 'zoro', role: 'Creative Director', avatar: '/Zoro.jpg' }, 
    { name: 'shanks', role: 'Product Designer', avatar: '/Shanks.jpeg' }, 
    { name: 'xebec', role: 'Junior Graphic Designer', avatar: 'Xebec.webp' }, 
  ]

  return (
    <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">Team members</h3>
      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-accent flex items-center justify-center text-white text-xl overflow-hidden flex-shrink-0">
              <MemberAvatar member={member} />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{member.name}</p>
              <p className="text-gray-400 text-xs">{member.role}</p>
            </div>
            <HiDotsVertical className="text-gray-400 cursor-pointer hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamMembers

