'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCurrentUser, logout } from '@/lib/auth'
import { generateVideo, pollJobStatus } from '@/lib/api'
import ScrollAnimation from '@/components/ScrollAnimation'

const AI_MODELS = [
  { id: 'model-1', name: '🎬 Cinematic Pro', description: 'Professional cinema-grade videos', color: 'from-purple-500' },
  { id: 'model-2', name: '🛍️ Product Showcase', description: 'Perfect for e-commerce', color: 'from-pink-500' },
  { id: 'model-3', name: '🌀 Dynamic Spin', description: 'Fast-paced 360° rotations', color: 'from-orange-500' },
]

const POSITIONS = [
  { id: 'center', label: 'Center', icon: '⭐' },
  { id: 'left', label: 'Left', icon: '◀️' },
  { id: 'right', label: 'Right', icon: '▶️' },
  { id: 'top', label: 'Top', icon: '⬆️' },
  { id: 'bottom', label: 'Bottom', icon: '⬇️' },
]

const COMMUNITY_VIDEOS = [
  { id: 1, title: 'Luxury Watch', thumbnail: '⌚', views: '12.5K' },
  { id: 2, title: 'Phone Display', thumbnail: '📱', views: '8.3K' },
  { id: 3, title: 'Product Spin', thumbnail: '🎯', views: '15.2K' },
  { id: 4, title: 'Premium Package', thumbnail: '📦', views: '9.7K' },
  { id: 5, title: 'Tech Showcase', thumbnail: '💻', views: '21.3K' },
  { id: 6, title: 'Fashion Item', thumbnail: '👜', views: '11.8K' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('video')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [imageUrl, setImageUrl] = useState('')
  const [selectedModel, setSelectedModel] = useState('model-1')
  const [selectedPosition, setSelectedPosition] = useState('center')
  const [generating, setGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [jobStatus, setJobStatus] = useState('idle')

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setPreviewImage(dataUrl)
        setImageUrl(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!imageUrl) {
      setError('Please upload an image first')
      return
    }

    setError('')
    setGenerating(true)
    setJobStatus('generating')

    try {
      const response = await generateVideo({
        product_image_url: imageUrl,
        model_type: selectedModel,
        position: selectedPosition,
      })

      setJobStatus('processing')
      const completed = await pollJobStatus(response.job_id)
      if (completed.video_url) {
        setVideoUrl(completed.video_url)
        setJobStatus('completed')
      } else {
        setError('Video generation failed')
        setJobStatus('failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video')
      setJobStatus('failed')
    } finally {
      setGenerating(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!mounted || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-dark-card border-b border-dark-border p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">BrainAI</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-dark-border transition"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Left Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: sidebarOpen ? 0 : -100, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed md:static left-0 top-16 md:top-0 w-64 h-[calc(100vh-4rem)] md:h-screen bg-dark-card border-r border-dark-border p-4 sm:p-6 flex flex-col z-30 md:z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">BrainAI</h1>
          <p className="text-sm text-gray-400 mt-1">AI Video Creator</p>
        </motion.div>

        <nav className="flex-1 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="px-4 py-3 rounded-xl bg-gradient-brand/20 border border-brand-purple/30"
          >
            <p className="text-xs text-gray-400 mb-1">Credits Balance</p>
            <p className="text-2xl font-bold text-brand-pink">{user.credits}</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="w-full px-4 py-3 rounded-xl bg-gradient-brand text-white font-semibold hover:shadow-glow-purple transition mt-4"
          >
            ✨ Create Video
          </motion.button>

          <div className="border-t border-dark-border pt-4 mt-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link href="/gallery" className="block px-4 py-2 rounded-lg hover:bg-dark-border transition text-sm">
                📸 Gallery
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Link href="/pricing" className="block px-4 py-2 rounded-lg hover:bg-dark-border transition text-sm">
                💰 Buy Credits
              </Link>
            </motion.div>
          </div>
        </nav>

        <div className="border-t border-dark-border pt-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm"
          >
            🚪 Logout
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen md:min-h-[calc(100vh-64px)] mt-16 md:mt-0 md:ml-64">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-40 border-b border-dark-border bg-dark-card/80 backdrop-blur"
        >
          <div className="px-8 py-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 bg-gradient-brand/5">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight"
            >
              Make Your <span className="bg-gradient-brand bg-clip-text text-transparent">Ideas Happen</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8"
            >
              Transform your product images into stunning AI-generated videos in seconds
            </motion.p>

            {/* Feature Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-8 sm:mb-12"
            >
              {[
                { id: 'video', label: '🎬 Video Creation', icon: '▶️' },
                { id: 'image', label: '🖼️ Image Enhancement', icon: '✨' },
                { id: 'article', label: '📝 Article Generation', icon: '✍️' },
              ].map((tab, i) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition text-xs sm:text-sm ${
                    activeTab === tab.id
                      ? 'bg-gradient-brand text-white shadow-glow-purple'
                      : 'bg-dark-card border border-dark-border text-gray-300 hover:border-brand-purple'
                  }`}
                >
                  {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-6xl mx-auto w-full">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {/* Upload Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="space-y-4 sm:space-y-6">
                {/* Image Upload */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-dark-card/80 to-dark-border/40 border border-dark-border hover:border-brand-purple/60 transition-all duration-300"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-5 flex items-center gap-2">
                    <span className="text-xl">📸</span> Upload Product Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      {previewImage ? (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="relative group"
                        >
                          <img src={previewImage} alt="Preview" className="w-full h-40 sm:h-56 object-cover rounded-2xl shadow-soft" />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                          >
                            <span className="text-white font-semibold text-center">
                              <p className="text-lg mb-1">🔄</p>
                              <p>Change Image</p>
                            </span>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ borderColor: 'rgba(124, 58, 237, 1)', scale: 1.02, backgroundColor: 'rgba(124, 58, 237, 0.05)' }}
                          whileDrag={{ scale: 1.05, backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                          className="border-2 border-dashed border-brand-purple/40 rounded-2xl p-12 text-center transition-all duration-300 hover:bg-brand-purple/5"
                        >
                          <motion.p
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-4xl sm:text-5xl mb-4"
                          >
                            📤
                          </motion.p>
                          <p className="text-gray-300 font-semibold text-base sm:text-lg">Drag and drop your image</p>
                          <p className="text-sm text-gray-400 mt-2">or click to browse</p>
                          <p className="text-xs text-gray-500 mt-3">Supports PNG, JPG, WebP up to 10MB</p>
                        </motion.div>
                      )}
                    </label>
                  </div>
                </motion.div>

                {/* Model Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-dark-card/80 to-dark-border/40 border border-dark-border"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-6 flex items-center gap-2">
                    <span className="text-xl">🎯</span> Select AI Model
                  </label>
                  <div className="space-y-4">
                    {AI_MODELS.map((model, i) => (
                      <motion.button
                        key={model.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.03, x: 12 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedModel(model.id)}
                        className={`w-full p-5 rounded-2xl text-left font-semibold transition-all duration-300 group border-2 ${
                          selectedModel === model.id
                            ? 'bg-gradient-brand text-white shadow-glow-purple border-brand-pink'
                            : 'bg-dark-card/50 border-dark-border text-gray-300 hover:border-brand-purple hover:bg-dark-card/80'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-base mb-1 group-hover:translate-x-1 transition-transform">{model.name}</p>
                            <p className="text-xs text-gray-400 group-hover:text-gray-300">{model.description}</p>
                          </div>
                          <motion.span
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className="text-xs bg-black/40 px-3 py-1.5 rounded-lg whitespace-nowrap ml-3 font-semibold"
                          >
                            25 credits
                          </motion.span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Position Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-dark-card/80 to-dark-border/40 border border-dark-border"
                >
                  <label className="block text-sm font-semibold text-gray-300 mb-6 flex items-center gap-2">
                    <span className="text-xl">🎨</span> Object Position
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {POSITIONS.map((pos, i) => (
                      <motion.button
                        key={pos.id}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                        whileHover={{ scale: 1.15, y: -5 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setSelectedPosition(pos.id)}
                        className={`py-4 px-2 rounded-2xl font-semibold transition-all duration-300 text-center border-2 group ${
                          selectedPosition === pos.id
                            ? 'bg-gradient-brand text-white shadow-glow-pink border-brand-pink'
                            : 'bg-dark-card/50 border-dark-border text-gray-300 hover:border-brand-pink hover:bg-dark-card/80'
                        }`}
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.3, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          className="text-2xl mb-2"
                        >
                          {pos.icon}
                        </motion.div>
                        <div className="text-xs font-medium group-hover:font-semibold transition">{pos.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 font-semibold"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}

                {/* Generate Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={
                    !generating && imageUrl && user.credits >= 25
                      ? { scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)' }
                      : {}
                  }
                  whileTap={
                    !generating && imageUrl && user.credits >= 25 ? { scale: 0.95 } : {}
                  }
                  onClick={handleGenerate}
                  disabled={generating || !imageUrl || user.credits < 25}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition shadow-elevated ${
                    generating || !imageUrl || user.credits < 25
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-brand text-white hover:shadow-glow-purple'
                  }`}
                >
                  {generating ? '⏳ Generating video...' : '🚀 Generate Video (25 credits)'}
                </motion.button>
              </div>
            </div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl p-8 bg-gradient-dark border border-dark-border h-full flex flex-col">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">📺 Preview</h3>

                {videoUrl ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col"
                  >
                    <video src={videoUrl} controls autoPlay loop className="w-full rounded-xl bg-black mb-4 flex-1" />
                    <div className="space-y-2">
                      <motion.p
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-green-400 font-semibold text-sm"
                      >
                        ✅ Video ready!
                      </motion.p>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={videoUrl}
                        download
                        className="w-full block text-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                      >
                        ⬇️ Download
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setVideoUrl(null)
                          setPreviewImage(null)
                          setImageUrl('')
                        }}
                        className="w-full bg-brand-purple text-white py-2 rounded-lg font-semibold hover:bg-brand-purple/80 transition"
                      >
                        ➕ Create Another
                      </motion.button>
                    </div>
                  </motion.div>
                ) : previewImage && !generating ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 flex flex-col items-center justify-center"
                  >
                    <img src={previewImage} alt="Preview" className="max-h-32 rounded-lg mb-4" />
                    <p className="text-sm text-gray-400 text-center">Ready to generate</p>
                  </motion.div>
                ) : jobStatus === 'processing' ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="rounded-full h-12 w-12 border-2 border-brand-purple border-t-brand-pink"
                    />
                    <p className="text-gray-300 mt-4 font-semibold text-sm">Generating...</p>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400 text-center text-sm">Upload image and click generate</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Most Uses Section */}
          <ScrollAnimation isContainer>
            <h2 className="text-3xl font-bold mb-8">📊 Most Uses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'E-commerce Products', uses: '45.2K', icon: '🛍️', color: 'from-pink-500' },
                { title: 'Tech Showcase', uses: '32.8K', icon: '💻', color: 'from-purple-500' },
                { title: 'Luxury Items', uses: '28.5K', icon: '✨', color: 'from-orange-500' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
                  className="p-6 rounded-2xl bg-gradient-dark border border-dark-border hover:border-brand-purple/50"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-4xl mb-3"
                  >
                    {stat.icon}
                  </motion.div>
                  <h3 className="font-semibold text-gray-300">{stat.title}</h3>
                  <p className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent mt-2">{stat.uses}</p>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>

          {/* Community Gallery */}
          <ScrollAnimation isContainer className="mt-20">
            <h2 className="text-3xl font-bold mb-8">🌟 Get Inspired from Community</h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {COMMUNITY_VIDEOS.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-dark border border-dark-border hover:border-brand-pink transition"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-video bg-gradient-brand/20 flex items-center justify-center text-6xl"
                  >
                    {video.thumbnail}
                  </motion.div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-300">{video.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">👁️ {video.views} views</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollAnimation>
        </div>
      </main>

      {/* Mobile Sidebar Toggle (for responsive) */}
      <style jsx>{`
        @media (max-width: 768px) {
          aside {
            transform: translateX(-100%);
          }
          main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}
