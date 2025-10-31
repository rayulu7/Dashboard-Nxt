import { useState, useEffect, useRef } from 'react'
import { HiEye, HiEyeOff, HiLockClosed, HiMail, HiUser, HiCamera } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/ui/use-toast'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null,
    remember: false,
  })
  const navigate = useNavigate()
  const { toast } = useToast()

  
  useEffect(() => {
    
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
     
      navigate('/profile')
      return
    }
    
    
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        remember: true,
      }))
    }
  }, [navigate])

  const handleAvatarChange = (e) => {
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
        setFormData(prev => ({ ...prev, avatar: base64String }))
        setAvatarPreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Username, Email, Password).",
        variant: "destructive",
      })
      return
    }

    
    const userData = {
      username: formData.username,
      email: formData.email,
      name: formData.username, // Use username as name
      avatar: formData.avatar || null,
      signedInAt: new Date().toISOString(),
      remember: formData.remember,
    }

    
    localStorage.setItem('user', JSON.stringify(userData))
   
    window.dispatchEvent(new Event('userUpdated'))
    
 
    if (formData.remember) {
      localStorage.setItem('rememberedEmail', formData.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }
    
    toast({
      title: "Sign In Successful!",
      description: `Welcome, ${userData.username}! Redirecting to dashboard...`,
      variant: "success",
    })
    
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="bg-card-bg rounded-xl p-6 sm:p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl font-bold mb-2">Sign In</h1>
            <p className="text-gray-400">Enter your email and password to sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
           
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-4">
                {avatarPreview ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-accent">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-accent to-light-blue flex items-center justify-center text-white text-3xl">
                    <HiUser />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-purple-accent rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors border-2 border-card-bg"
                >
                  <HiCamera className="text-sm" />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-gray-400 text-xs text-center">Click camera icon to upload avatar</p>
            </div>

           
            <div>
              <label className="block text-gray-400 text-sm mb-2">Username</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter your username"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="pl-10 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.remember}
                  onCheckedChange={(checked) => setFormData({ ...formData, remember: !!checked })}
                />
                <span className="text-gray-400 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-purple-accent text-sm hover:text-purple-400 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-purple-accent hover:text-purple-400 font-semibold">
                Sign Up
              </a>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center mb-4">Or sign in with</p>
            <div className="grid grid-cols-3 gap-3">
              {['Google', 'Facebook', 'GitHub'].map((provider) => (
                <Button
                  key={provider}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: `${provider} Sign In`,
                      description: `Redirecting to ${provider} authentication...`,
                      variant: "default",
                    })
                  }}
                >
                  {provider}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignIn

