'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCurrentUser, logout } from '@/lib/auth'
import ScrollAnimation from '@/components/ScrollAnimation'

const SAMPLE_VIDEOS = [
  {
    id: 1,
    title: 'Luxury Watch Cinematic',
    model: 'Cinematic Pro',
    icon: '⌚',
    duration: '15s',
  },
  {
    id: 2,
    title: 'Smartphone Product Showcase',
    model: 'Product Showcase',
    icon: '📱',
    duration: '10s',
  },
  {
    id: 3,
    title: 'Sneaker 360° Spin',
    model: 'Dynamic Spin',
    icon: '👟',
    duration: '12s',
  },
  {
    id: 4,
    title: 'Camera Equipment Pro',
    model: 'Cinematic Pro',
    icon: '📷',
    duration: '18s',
  },
  {
    id: 5,
    title: 'Jewelry Showcase Elegant',
    model: 'Product Showcase',
    icon: '💎',
    duration: '14s',
  },
  {
    id: 6,
    title: 'Headphone Dynamic Demo',
    model: 'Dynamic Spin',
    icon: '🎧',
    duration: '11s',
  },
]

export default function GalleryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<(typeof SAMPLE_VIDEOS)[0] | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVideos = SAMPLE_VIDEOS.filter(video => {
    const matchesModel = !selectedModel || video.model.includes(selectedModel)
    const matchesSearch = !searchQuery || video.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesModel && matchesSearch
  })

  const models = Array.from(new Set(SAMPLE_VIDEOS.map(v => v.model)))

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
    } else {
      setUser(currentUser)
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!mounted || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-dark-border bg-dark-card/80 backdrop-blur"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <Link href="/dashboard" className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                BrainAI
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <div className="text-right text-sm">
              <p className="text-gray-400">{user.email}</p>
              <p className="text-lg font-bold text-brand-pink">{user.credits} credits</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-dark-border transition"
              >
                ← Dashboard
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm font-semibold"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-4"
          >
            🌟 Get Inspired from <span className="bg-gradient-brand bg-clip-text text-transparent">Community</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Explore videos created with our AI models
          </motion.p>
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-dark-card border-2 border-dark-border rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors duration-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </motion.div>
          </div>

          {/* Model Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-3 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedModel(null)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                selectedModel === null
                  ? 'bg-gradient-brand text-white border-brand-pink shadow-glow-purple'
                  : 'bg-dark-card border-dark-border text-gray-300 hover:border-brand-purple'
              }`}
            >
              All Models
            </motion.button>
            {models.map((model, i) => (
              <motion.button
                key={model}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedModel(selectedModel === model ? null : model)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                  selectedModel === model
                    ? 'bg-gradient-brand text-white border-brand-pink shadow-glow-purple'
                    : 'bg-dark-card border-dark-border text-gray-300 hover:border-brand-purple'
                }`}
              >
                {model}
              </motion.button>
            ))}
          </motion.div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-400"
          >
            {filteredVideos.length} result{filteredVideos.length !== 1 ? 's' : ''} found
          </motion.p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {filteredVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -12,
                boxShadow: '0 30px 80px rgba(236, 72, 153, 0.3)',
                scale: 1.04,
              }}
              onClick={() => setSelectedVideo(video)}
              className="group rounded-2xl overflow-hidden cursor-pointer border-2 border-dark-border hover:border-brand-pink transition-all duration-300 shadow-soft hover:shadow-elevated-lg"
            >
              <div className="relative aspect-video bg-gradient-to-br from-dark-card to-dark-border flex items-center justify-center overflow-hidden">
                {/* Background gradient glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />

                <motion.div
                  whileHover={{ scale: 1.3, rotate: 5 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="text-8xl relative z-10"
                >
                  {video.icon}
                </motion.div>

                {/* Play button overlay */}
                <motion.div
                  initial={{ opacity: 0, backgroundColor: 'rgba(124, 58, 237, 0)' }}
                  whileHover={{ opacity: 1, backgroundColor: 'rgba(124, 58, 237, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
                >
                  <motion.button
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className="text-white text-5xl drop-shadow-2xl relative z-20 bg-gradient-brand p-4 rounded-full shadow-glow-purple"
                  >
                    ▶
                  </motion.button>
                </motion.div>

                {/* Duration badge */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-semibold shadow-elevated z-20"
                >
                  ⏱️ {video.duration}
                </motion.span>
              </div>

              {/* Card footer */}
              <motion.div
                initial={{ backgroundColor: 'rgba(26, 26, 46, 0.5)' }}
                whileHover={{ backgroundColor: 'rgba(26, 26, 46, 0.8)' }}
                className="p-5 bg-dark-card/50 border-t border-dark-border/50 transition-colors duration-300"
              >
                <h3 className="font-bold text-white mb-2 text-base group-hover:text-brand-pink transition-colors">{video.title}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span>🤖</span> {video.model}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <ScrollAnimation isContainer>
          <div className="grid md:grid-cols-3 gap-8 bg-gradient-dark border border-dark-border rounded-2xl p-12 text-center">
            {[
              { value: '2.5M+', label: 'Videos Generated' },
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '< 2min', label: 'Average Processing' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className="text-4xl font-bold bg-gradient-brand bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollAnimation>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-b from-dark-card/95 to-dark-border/50 rounded-3xl overflow-hidden max-w-2xl w-full border-2 border-dark-border shadow-elevated-lg"
            >
              {/* Video Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="aspect-video bg-dark-bg flex items-center justify-center relative overflow-hidden"
              >
                {/* Gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-brand opacity-10"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                  animate={{ y: [-25, 25, -25] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-9xl relative z-10"
                >
                  {selectedVideo.icon}
                </motion.div>

                {/* Subtle play indicator */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-semibold"
                >
                  ▶ Click to play
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="p-8"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">{selectedVideo.title}</h2>
                  <div className="flex items-center gap-4">
                    <span className="inline-block bg-gradient-brand/20 border border-brand-purple/50 text-brand-pink px-4 py-2 rounded-full text-sm font-semibold">
                      🤖 {selectedVideo.model}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ⏱️ {selectedVideo.duration}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVideo(null)}
                    className="bg-gradient-brand text-white py-3 rounded-xl font-bold shadow-glow-purple hover:shadow-glow-purple-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>✓</span> Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-dark-card border-2 border-dark-border text-white py-3 rounded-xl font-bold hover:border-brand-pink transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>📥</span> Save
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
