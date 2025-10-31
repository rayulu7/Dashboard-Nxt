import { useState, useEffect } from 'react'
import { HiCamera, HiMail, HiPhone, HiLocationMarker, HiCalendar, HiUser, HiPencil } from 'react-icons/hi'
import { useToast } from '../components/ui/use-toast'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  
  
  const getInitialProfile = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      return {
        username: user.username || '',
        name: user.name || user.username || user.email?.split('@')[0] || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        avatar: user.avatar || null,
        joinDate: user.signedInAt ? new Date(user.signedInAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        role: user.role || 'User',
        bio: user.bio || '',
      }
    }
    
    return {
      username: '',
      name: '',
      email: '',
      phone: '',
      location: '',
      avatar: null,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      role: 'User',
      bio: '',
    }
  }

  const [profile, setProfile] = useState(getInitialProfile())

  
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setProfile(prev => ({
        ...prev,
        username: user.username || prev.username,
        name: user.name || prev.name || user.username || user.email?.split('@')[0],
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        location: user.location || prev.location,
        avatar: user.avatar || prev.avatar,
        joinDate: user.signedInAt ? new Date(user.signedInAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : prev.joinDate,
        role: user.role || prev.role,
        bio: user.bio || prev.bio,
      }))
    }
  }, [])

  const stats = [
    { label: 'Projects', value: '24', change: '+12%' },
    { label: 'Tasks', value: '156', change: '+8%' },
    { label: 'Revenue', value: '$45.2K', change: '+23%' },
  ]

  return (
    <main className="mt-16 lg:mt-20 lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage your profile information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
       
        <div className="lg:col-span-1">
          <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="relative mb-6">
              {profile.avatar ? (
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-accent">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-accent to-light-blue rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {profile.name ? profile.name.substring(0, 2).toUpperCase() : (profile.email ? profile.email.substring(0, 2).toUpperCase() : 'U')}
                </div>
              )}
              <Button 
                size="icon"
                className="absolute bottom-0 right-1/2 transform translate-x-8 rounded-full"
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = (e) => {
                    const file = e.target.files[0]
                    if (file) {
                      if (!file.type.startsWith('image/')) {
                        toast({
                          title: "Invalid File",
                          description: "Please select an image file.",
                          variant: "destructive",
                        })
                        return
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        toast({
                          title: "File Too Large",
                          description: "Please select an image smaller than 2MB.",
                          variant: "destructive",
                        })
                        return
                      }
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        const base64String = reader.result
                        setProfile(prev => ({ ...profile, avatar: base64String }))
                      
                        const savedUser = localStorage.getItem('user')
                        if (savedUser) {
                          const user = JSON.parse(savedUser)
                          const updatedUser = { ...user, avatar: base64String }
                          localStorage.setItem('user', JSON.stringify(updatedUser))
                         
                          window.dispatchEvent(new Event('userUpdated'))
                        }
                        toast({
                          title: "Avatar Updated!",
                          description: "Your profile picture has been updated.",
                          variant: "success",
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                  }
                  input.click()
                }}
              >
                <HiCamera />
              </Button>
            </div>
            <div className="text-center mb-6">
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-center text-2xl font-bold mb-1"
                  placeholder="Enter name"
                />
              ) : (
                <h2 className="text-white text-2xl font-bold mb-1">{profile.name || 'User'}</h2>
              )}
              {isEditing ? (
                <Input
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="text-center text-gray-400 mt-2"
                  placeholder="Enter role"
                />
              ) : (
                <p className="text-gray-400">{profile.role}</p>
              )}
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <HiMail />
                {isEditing ? (
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-sm">{profile.email || 'No email'}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiPhone />
                {isEditing ? (
                  <Input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="flex-1"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <span className="text-sm">{profile.phone || 'No phone'}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiLocationMarker />
                {isEditing ? (
                  <Input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="flex-1"
                    placeholder="Enter location"
                  />
                ) : (
                  <span className="text-sm">{profile.location || 'No location'}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <HiCalendar />
                <span className="text-sm">Joined {profile.joinDate}</span>
              </div>
            </div>
                <Button 
                  onClick={() => {
                    if (isEditing) {
                      
                      const savedUser = localStorage.getItem('user')
                      if (savedUser) {
                        const user = JSON.parse(savedUser)
                        const updatedUser = {
                          ...user,
                          username: profile.username || user.username,
                          name: profile.name,
                          email: profile.email,
                          phone: profile.phone,
                          location: profile.location,
                          avatar: profile.avatar || user.avatar,
                          role: profile.role,
                          bio: profile.bio,
                          updatedAt: new Date().toISOString(),
                        }
                        localStorage.setItem('user', JSON.stringify(updatedUser))
                        
                        window.dispatchEvent(new Event('userUpdated'))
                      }
                      toast({
                        title: "Profile Updated!",
                        description: "Your profile has been successfully updated.",
                        variant: "success",
                      })
                    }
                    setIsEditing(!isEditing)
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <HiPencil />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
          </div>
        </div>

        
        <div className="lg:col-span-2 space-y-6">
         
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-white text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-green-400 text-xs">{stat.change}</p>
              </div>
            ))}
          </div>

          
          <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg sm:text-xl font-bold">About</h3>
              <button className="text-gray-400 hover:text-white">
                <HiPencil />
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full bg-dark-blue border border-gray-600 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-accent resize-none"
                rows="4"
              />
            ) : (
              <p className="text-gray-400">{profile.bio}</p>
            )}
          </div>

              
              <div className="bg-card-bg rounded-xl p-4 sm:p-6 shadow-lg">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Completed task', item: 'Dashboard Design', time: '2 hours ago' },
                { action: 'Created project', item: 'E-commerce App', time: '5 hours ago' },
                { action: 'Updated profile', item: 'Profile information', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-700 last:border-0">
                  <div className="w-10 h-10 bg-purple-accent/20 rounded-full flex items-center justify-center">
                    <HiUser className="text-purple-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-semibold">{activity.action}</span> - {activity.item}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile

